import { Sequelize, DataTypes }  from 'sequelize'
import { pool, sequelize } from '../db.js';

const department = sequelize.define('departments',{
    
    id_departments:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(150), 
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(15), 
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50), 
        allowNull: false,
        validate: {
            isEmail: true, 
        },
    },
    operational_status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
    },


},
{
    timestamps: false
}
)

export default department