import { pgTable, serial, text, integer, real, varchar, timestamp } from "drizzle-orm/pg-core";

export const cazadores = pgTable("cazadores", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  edad: integer("edad"),
  altura: real("altura"),
  peso: real("peso"),
  imagen: text("imagen"),
  genero: varchar("genero", { length: 20 }),
  habilidades: text("habilidades").array(), // arreglo de strings
  tipoLicencia: varchar("tipo_licencia", { length: 20 })
    .default("Novato")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
