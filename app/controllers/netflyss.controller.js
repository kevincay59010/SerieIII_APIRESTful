const { Pelicula } = require("../models");

exports.getPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.getAll();

    return res.status(200).json({
      success: true,
      data: peliculas,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener las películas",
      error: error.message,
    });
  }
};

exports.getPeliculaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pelicula = await Pelicula.getById(id);

    if (!pelicula) {
      return res.status(404).json({
        success: false,
        message: "Película/serie no encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      data: pelicula,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener la película/serie",
      error: error.message,
    });
  }
};

exports.createPelicula = async (req, res) => {
  try {
    const {
      nombre,
      sinopsis,
      actores,
      duracion,
      tipo,
      categoria,
      anio_lanzamiento,
    } = req.body;

    if (!nombre || !tipo || !categoria || !anio_lanzamiento) {
      return res.status(400).json({
        success: false,
        message: "Los campos nombre, tipo, categoria y anio_lanzamiento son obligatorios",
      });
    }

    const nuevoRegistro = await Pelicula.create({
      nombre,
      sinopsis,
      actores,
      duracion: duracion ? Number(duracion) : null,
      tipo,
      categoria,
      anio_lanzamiento: Number(anio_lanzamiento),
    });

    return res.status(201).json({
      success: true,
      message: "Película/serie creada correctamente",
      data: nuevoRegistro,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al crear la película/serie",
      error: error.message,
    });
  }
};

exports.updatePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      sinopsis,
      actores,
      duracion,
      tipo,
      categoria,
      anio_lanzamiento,
    } = req.body;

    if (!nombre || !tipo || !categoria || !anio_lanzamiento) {
      return res.status(400).json({
        success: false,
        message: "Los campos nombre, tipo, categoria y anio_lanzamiento son obligatorios",
      });
    }

    const peliculaActualizada = await Pelicula.update(id, {
      nombre,
      sinopsis,
      actores,
      duracion: duracion ? Number(duracion) : null,
      tipo,
      categoria,
      anio_lanzamiento: Number(anio_lanzamiento),
    });

    if (!peliculaActualizada) {
      return res.status(404).json({
        success: false,
        message: "Película/serie no encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Película/serie actualizada correctamente",
      data: peliculaActualizada,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la película/serie",
      error: error.message,
    });
  }
};

exports.deletePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const peliculaEliminada = await Pelicula.remove(id);

    if (!peliculaEliminada) {
      return res.status(404).json({
        success: false,
        message: "Película/serie no encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Película/serie eliminada correctamente",
      data: peliculaEliminada,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar la película/serie",
      error: error.message,
    });
  }
};
