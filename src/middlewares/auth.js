import jwt from "jsonwebtoken";
import { errors, throwError } from "../utils/errors.js";

export function verifyToken(req, res, next) {
  // 1. Busca el token en la cabecera
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    throwError(errors.Notoken);
  }

  try {
    // 2. Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 3. Guarda los datos del usuario en la petición
    next(); // 4. Continúa a la siguiente función (el controlador)
  } catch (err) {
    throwError(errors.invalidToken);
  }
}
