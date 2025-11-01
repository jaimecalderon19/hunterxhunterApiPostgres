import { pgTable, serial, text, integer, real, varchar, timestamp } from "drizzle-orm/pg-core";

export const cazadores = pgTable("cazadores", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre").notNull(),
  edad: integer("edad"),
  altura: real("altura"),
  peso: real("peso"),
  imagen: text("imagen"),
  genero: varchar("genero"),
  habilidades: text("habilidades").array(),
  tipoLicencia: varchar("tipo_licencia")
    .default("Novato")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
