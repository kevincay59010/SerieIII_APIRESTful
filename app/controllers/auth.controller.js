const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username y password son obligatorios",
    });
  }

  const expectedUser = process.env.AUTH_USER || "admin";
  const expectedPassword = process.env.AUTH_PASSWORD || "admin123";

  if (username !== expectedUser || password !== expectedPassword) {
    return res.status(401).json({
      success: false,
      message: "Credenciales inválidas",
    });
  }

  const payload = {
    username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || "default_secret_key", {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });

  return res.status(200).json({
    success: true,
    message: "Token generado correctamente",
    token,
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};
