import express from "express";
import { db } from "../config/db.js";
import { cazadores } from "../schema/cazadorSchema.js";
import { eq } from "drizzle-orm";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cazadores
 *   description: API de Cazadores del universo Hunter x Hunter
 */

/**
 * @swagger
 * /cazadores:
 *   get:
 *     summary: Obtiene todos los cazadores
 *     tags: [Cazadores]
 *     responses:
 *       200:
 *         description: Lista de cazadores
 */
router.get("/cazadores", async (req, res) => {
  try {
    const data = await db.select().from(cazadores);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener cazadores" });
  }
});

/**
 * @swagger
 * /cazadores/buscar:
 *   get:
 *     summary: Busca un cazador por su nombre
 *     tags: [Cazadores]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         description: Nombre del cazador a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resultado de la búsqueda
 */
router.get("/cazadores/buscar", async (req, res) => {
  const { nombre } = req.query;

  if (!nombre)
    return res.status(400).json({ error: "Debes proporcionar un nombre" });

  try {
    const resultado = await db
      .select()
      .from(cazadores)
      .where(ilike(cazadores.nombre, `%${nombre}%`));

    if (resultado.length > 0) {
      res.json({ found: true, cazadores: resultado });
    } else {
      res.json({ found: false, message: "Cazador no encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar el cazador" });
  }
});

/**
 * @swagger
 * /cazadores:
 *   post:
 *     summary: Crea un nuevo cazador
 *     tags: [Cazadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               nombre:
 *                 type: string
 *               edad:
 *                 type: number
 *               altura:
 *                 type: number
 *               peso:
 *                 type: number
 *               genero:
 *                 type: string
 *               habilidades:
 *                 type: array
 *                 items:
 *                   type: string
 *               tipoLicencia:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cazador creado exitosamente
 */
router.post("/cazadores", async (req, res) => {
  try {
    const [nuevo] = await db.insert(cazadores).values(req.body).returning("*");
    res
      .status(201)
      .json({ message: "Cazador creado exitosamente", cazador: nuevo });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ error: "Error al crear el cazador", details: err.message });
  }
});

/**
 * @swagger
 * /cazadores/{id}:
 *   put:
 *     summary: Actualiza un cazador por ID
 *     tags: [Cazadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cazador a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Cazador actualizado correctamente
 */
router.put("/cazadores/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [actualizado] = await db
      .update(cazadores)
      .set(req.body)
      .where(eq(cazadores.id, Number(id)))
      .returning("*");

    if (!actualizado)
      return res.status(404).json({ error: "Cazador no encontrado" });

    res.json({ message: "Cazador actualizado correctamente", cazador: actualizado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el cazador" });
  }
});

/**
 * @swagger
 * /cazadores/{id}:
 *   delete:
 *     summary: Elimina un cazador por ID
 *     tags: [Cazadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cazador a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cazador eliminado correctamente
 */
router.delete("/cazadores/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db
      .delete(cazadores)
      .where(eq(cazadores.id, Number(id)))
      .returning("*");

    if (deleted.length === 0)
      return res.status(404).json({ error: "Cazador no encontrado" });

    res.json({ message: "Cazador eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el cazador" });
  }
});

export default router;
