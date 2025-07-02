import app from "./app.js";
import express from "express";
import { PORT } from "./config.js";
import usersRoutes from "./routes/users.routes.js";
import departmentsRoutes from "./routes/departments.routes.js";
import assetsRoutes from "./routes/assets.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import reportRoutes from "./routes/reports.routes.js";

import loginRoutes from "./routes/login.routes.js";
import pdf from "./routes/pdf.routes.js";

import morgan from "morgan";

import { errorHandler } from "./middlewares/errorHandler.js";

app.use(morgan("dev"));
app.use(express.json());
app.use(usersRoutes);
app.use(reportRoutes);
app.use(departmentsRoutes);
app.use(assetsRoutes);
app.use(dashboardRoutes);
app.use(loginRoutes);
app.use(pdf);
app.use(errorHandler);

app.listen(PORT);
console.log("Server on port", PORT);
