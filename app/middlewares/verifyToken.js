module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token no proporcionado o inválido",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido",
      error: error.message,
    });
  }
};
