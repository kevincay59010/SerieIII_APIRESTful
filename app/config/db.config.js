const { Pool } = require("pg");

require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl:
    process.env.DB_SSL === "true"
      ? { rejectUnauthorized: false }
      : false,
});

pool.on("connect", () => {
  console.log("Conectado a PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Error inesperado en el pool de PostgreSQL:", err);
});

const initializeDatabase = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS peliculas (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      sinopsis TEXT,
      actores TEXT,
      duracion INTEGER,
      tipo VARCHAR(50),
      categoria VARCHAR(100),
      anio_lanzamiento INTEGER,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Tabla 'peliculas' lista");
  } catch (error) {
    console.error("Error iniciando la base de datos:", error.message);
    process.exit(1);
  }
};

initializeDatabase();

module.exports = pool;
