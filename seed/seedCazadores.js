import { db } from "../config/db.js";
import { cazadores } from "../schema/cazadorSchema.js";
import { count } from "drizzle-orm";

// 🧭 Nuevos cazadores (no repetidos)
const cazadoresIniciales = [
  {
    nombre: 'Biscuit Krueger',
    edad: 57,
    altura: 160,
    peso: 49,
    genero: 'Femenino',
    imagen: 'https://example.com/biscuit.jpg',
    habilidades: ['Transformación Nen', 'Fuerza Oculta', 'Maestra del Entrenamiento'],
    tipoLicencia: 'Double Star',
  },
  {
    nombre: 'Morel Mackernasey',
    edad: 46,
    altura: 182,
    peso: 82,
    genero: 'Masculino',
    imagen: 'https://example.com/morel.jpg',
    habilidades: ['Deep Purple', 'Control de Humo', 'Estratega'],
    tipoLicencia: 'Double Star',
  },
  {
    nombre: 'Knuckle Bine',
    edad: 28,
    altura: 183,
    peso: 85,
    genero: 'Masculino',
    imagen: 'https://example.com/knuckle.jpg',
    habilidades: ['Hakoware', 'Puño Inquebrantable', 'Corazón Noble'],
    tipoLicencia: 'Single Star',
  },
  {
    nombre: 'Shoot McMahon',
    edad: 27,
    altura: 178,
    peso: 72,
    genero: 'Masculino',
    imagen: 'https://example.com/shoot.jpg',
    habilidades: ['Amputate Aura', 'Combate Estratégico', 'Sigilo'],
    tipoLicencia: 'Single Star',
  },
  {
    nombre: 'Kite',
    edad: 25,
    altura: 183,
    peso: 76,
    genero: 'Masculino',
    imagen: 'https://example.com/kite.jpg',
    habilidades: ['Crazy Slots', 'Reencarnación Nen', 'Instinto Salvaje'],
    tipoLicencia: 'Triple Star',
  },
  {
    nombre: 'Palm Siberia',
    edad: 22,
    altura: 175,
    peso: 60,
    genero: 'Femenino',
    imagen: 'https://example.com/palm.jpg',
    habilidades: ['Wink Blue', 'Rastreo Nen', 'Resiliencia'],
    tipoLicencia: 'Novato',
  },
];

export const seedCazadores = async () => {
  try {
    // Contar si ya hay cazadores
    const existing = await db.select({ total: count() }).from(cazadores);
    const total = Number(existing[0]?.total ?? 0);

    if (total === 0) {
      await db.insert(cazadores).values(cazadoresIniciales);
      console.log("🧭 Cazadores iniciales insertados correctamente.");
    } else {
      console.log("⚠️ Ya existen cazadores en la base de datos, no se insertaron nuevos.");
    }
  } catch (error) {
    console.error("❌ Error al insertar los cazadores iniciales:", error.message);
  }
};

// Ejecutar directamente si se llama desde CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  seedCazadores().then(() => process.exit());
}
