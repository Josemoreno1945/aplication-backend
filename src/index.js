import app from "./app.js";
import express from "express";
import { PORT } from "./config.js";
import usersRoutes from "./routes/users.routes.js";
import departmentsRoutes from "./routes/departments.routes.js";
import assetsRoutes from "./routes/assets.routes.js";

import reportRoutes from "./routes/reports.routes.js";

import loginRoutes from "./routes/login.routes.js";

import morgan from "morgan";

import { error } from "./middlewares/errors.js";

app.use(morgan("dev"));
app.use(express.json());
app.use(usersRoutes);
app.use(reportRoutes);
app.use(departmentsRoutes);
app.use(assetsRoutes);
app.use(loginRoutes);
app.use(error);

app.listen(PORT);
console.log("Server on port", PORT);
