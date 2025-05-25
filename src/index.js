import app from "./app.js"
import express from 'express'
import {PORT} from "./config.js"
import usersRoutes from "./routes/users.routes.js"
import departmentsRoutes from "./routes/departments.routes.js"
import assetsRoutes from "./routes/assets.routes.js"
import morgan from 'morgan'




app.use(morgan('dev'))
app.use(express.json())
app.use(usersRoutes)
app.use(departmentsRoutes)
app.use(assetsRoutes)
app.listen(PORT);
console.log("Server on port",PORT)