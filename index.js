import express from "express";
import cors from "cors";
import { db } from "./config/db.js";
import cazadoresRoutes from "./routes/cazadores.routes.js";
import { seedCazadores } from "./seed/seedCazadores.js";
import swaggerDocs from "./config/swagger.js";

const app = express();
const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

// 🔗 Verificar conexión a PostgreSQL
(async () => {
  try {
    // Solo para probar conexión: hacer una consulta simple
    await db.execute("SELECT 1");
    console.log("✅ Conectado correctamente a PostgreSQL");

    // Ejecutar el seeder solo si la tabla está vacía
    await seedCazadores();
  } catch (err) {
    console.error("❌ Error al conectar a PostgreSQL:", err.message);
    process.exit(1);
  }
})();

// 📘 Swagger
swaggerDocs(app);

// 🧭 Rutas
app.use("/api", cazadoresRoutes);

// 🚀 Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
