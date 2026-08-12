const express = require("express");
const {
  getPeliculas,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
} = require("../controllers/netflyss.controller");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", verifyToken, getPeliculas);
router.get("/:id", verifyToken, getPeliculaById);
router.post("/", verifyToken, createPelicula);
router.put("/:id", verifyToken, updatePelicula);
router.delete("/:id", verifyToken, deletePelicula);

module.exports = router;
