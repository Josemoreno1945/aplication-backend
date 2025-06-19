import { token } from "morgan";

export function throwError(errorObj) {
  const error = new Error(errorObj.message);
  error.status = errorObj.status;
  throw error;
}

export const errors = {
  // Usuarios-----------------------------------------
  userNotFound: {
    status: 404,
    message: "User not found",
  },
  userDuplicated: {
    status: 409,
    message: "The user is already registered",
  },
  User_emailDuplicated: {
    status: 409,
    message: "the email is already registered",
  },
  // Departamentos-------------------------------------
  departmentNotFound: {
    status: 404,
    message: "Department not found",
  },
  departmentDuplicated: {
    status: 409,
    message: "The department is already registered",
  },
  Dpt_emailDuplicated: {
    status: 409,
    message: "the email is already registered",
  },
  // Assets--------------------------------------------
  assetNotFound: {
    status: 404,
    message: "Asset not found",
  },
  // Reportes------------------------------------------
  reportNotFound: {
    status: 404,
    message: "Report not found",
  },

  //login-----------------------------------------------
  InvalidPassword: {
    status: 401,
    message: "Invalid Password",
  },

  // Errores generales de base de datos / consultas--------------------------------

  dbConnectionError: {
    status: 503,
    message: "Database connection error",
  },
  querySyntaxError: {
    status: 400,
    message: "SQL syntax error",
  },
  foreignKeyViolation: {
    status: 409,
    message: "Foreign key constraint violation",
  },
  notNullViolation: {
    status: 400,
    message: "Null value in column violates not-null constraint",
  },
  dataTypeMismatch: {
    status: 400,
    message: "Data type mismatch in query",
  },
  //Error de autenticacion o token---------------------------------------------------------
  unauthorized: {
    status: 403,
    message: "Admin-only access",
  },
  Notoken: {
    status: 401,
    message: "No token provided",
  },
  invalidToken: {
    status: 403,
    message: "Invalid token",
  },

  // Otros errores comunes--------------------------------------------------------
  missingFields: {
    status: 400,
    message: "Missing required fields",
  },
  invalidData: {
    status: 400,
    message: "invalid id",
  },
};
