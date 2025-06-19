import { errors, throwError } from "../utils/errors.js";

export function handleDBError(error) {
  switch (error.code) {
    case "23503":
      throwError(errors.foreignKeyViolation);
    case "23502":
      throwError(errors.notNullViolation);

    case "42601":
      throwError(errors.querySyntaxError);

    case "42804":
      throwError(errors.dataTypeMismatch);

    case "ECONNREFUSED":
      throwError(errors.dbConnectionError);

    default:
      throw error; // Si no es un error conocido, lo relanzas
  }
}
