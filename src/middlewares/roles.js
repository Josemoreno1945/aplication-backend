export function isAdmin(req, res, next) {
  if (req.user.role === "admin" || req.user.role === 1) {
    return next();
  }
  return res.status(403).json({ message: "Acceso solo para administradores" });
}
