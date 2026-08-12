require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});

const express = require("express");
const cors = require("cors");

const peliculasRoutes = require("./app/routes/netflyss.route");
const authRoutes = require("./app/routes/auth.route");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando correctamente",
    status: "ok",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/peliculas", peliculasRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
