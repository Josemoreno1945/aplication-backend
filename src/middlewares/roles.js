import { errors, throwError } from "../utils/errors.js";

export function isAdmin(req, res, next) {
  if (req.user.role === "admin" || req.user.role === 1) {
    return next();
  }
  throwError(errors.unauthorized);
}
