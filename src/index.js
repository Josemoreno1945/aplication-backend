import app from "./app.js";
import express from "express";
import { PORT } from "./config.js";
import { pool } from "pg";

import usersRoutes from "./routes/users.routes.js";
import departmentsRoutes from "./routes/departments.routes.js";
import assetsRoutes from "./routes/assets.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import registerRoutes from "./routes/register.routes.js";
import reportRoutes from "./routes/reports.routes.js";
import filterRoutes from "./routes/filter.routes.js";
import loginRoutes from "./routes/login.routes.js";

import morgan from "morgan";

import { errorHandler } from "./middlewares/errorHandler.js";

app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API Backend!");
});

app.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  return res.json(result.rows[0]);
});

app.use(morgan("dev"));
app.use(express.json());

app.use(usersRoutes);
app.use(reportRoutes);
app.use(departmentsRoutes);
app.use(assetsRoutes);
app.use(dashboardRoutes);
app.use(loginRoutes);
app.use(filterRoutes);
app.use(profileRoutes);
app.use(registerRoutes);

app.use(errorHandler);

app.listen(PORT);
console.log("Server on port", PORT);
