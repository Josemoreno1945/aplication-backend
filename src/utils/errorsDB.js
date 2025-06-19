import { errors, throwError } from "../utils/errors.js";

export function handleDBError(error) {
  switch (error.code) {
    case "23505": // unique_violation
      throwError(errors.dbConstraintError); // O errors.uniqueViolation si tienes uno más específico
    case "23503": // foreign_key_violation
      throwError(errors.dbConstraintError);
    case "23502": // not_null_violation
      throwError(errors.dbConstraintError);
  }
}
