const { Pool } = require("pg");

require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});

const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres",
  ssl: process.env.DB_SSL === "true",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const pool = new Pool({
  host: dbConfig.HOST,
  port: process.env.DB_PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  ssl: dbConfig.ssl ? { rejectUnauthorized: false } : false,
  max: dbConfig.pool.max,
  min: dbConfig.pool.min,
  idleTimeoutMillis: dbConfig.pool.idle,
  connectionTimeoutMillis: dbConfig.pool.acquire,
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

module.exports = {
  dbConfig,
  pool,
};
