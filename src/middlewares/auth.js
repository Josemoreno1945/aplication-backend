import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  // 1. Busca el token en la cabecera
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    // 2. Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 3. Guarda los datos del usuario en la petición
    next(); // 4. Continúa a la siguiente función (el controlador)
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
