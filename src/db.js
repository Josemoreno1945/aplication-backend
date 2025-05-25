import pg from 'pg'
import { Sequelize } from 'sequelize';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config.js'
const {Pool} = pg



const pool = new Pool({
    user:DB_USER,
    host:DB_HOST,
    database:DB_DATABASE,
    password:DB_PASSWORD,
    port:DB_PORT

})


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
    dialect: 'postgres',
    logging: false,
});

export { pool, sequelize };


