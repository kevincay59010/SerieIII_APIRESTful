const { pool } = require("../config/db.config");

class Pelicula {
  static async getAll() {
    const result = await pool.query(
      "SELECT * FROM peliculas ORDER BY id ASC"
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(
      "SELECT * FROM peliculas WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  static async create({ nombre, sinopsis, actores, duracion, tipo, categoria, anio_lanzamiento }) {
    const result = await pool.query(
      `
        INSERT INTO peliculas (nombre, sinopsis, actores, duracion, tipo, categoria, anio_lanzamiento)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `,
      [nombre, sinopsis, actores, duracion, tipo, categoria, anio_lanzamiento]
    );

    return result.rows[0];
  }

  static async update(id, { nombre, sinopsis, actores, duracion, tipo, categoria, anio_lanzamiento }) {
    const result = await pool.query(
      `
        UPDATE peliculas
        SET nombre = $1, sinopsis = $2, actores = $3, duracion = $4, tipo = $5, categoria = $6, anio_lanzamiento = $7
        WHERE id = $8
        RETURNING *
      `,
      [nombre, sinopsis, actores, duracion, tipo, categoria, anio_lanzamiento, id]
    );

    return result.rows[0];
  }

  static async remove(id) {
    const result = await pool.query(
      "DELETE FROM peliculas WHERE id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }
}

module.exports = Pelicula;
