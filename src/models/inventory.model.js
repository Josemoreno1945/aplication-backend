import { Sequelize, DataTypes }  from 'sequelize'
import { pool, sequelize } from '../db.js';


const inventory =sequelize.define('inventory',{

    id_inventory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
    },

    id_departments: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'departments', 
            key: 'id_departments',
        }
    },

    available_quantity: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },

    last_updated: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    inventory_status: {
        type: DataTypes.ENUM('activo', 'out_of_stock', 'damaged', 'full_stock','overstocked'), 
        allowNull: false, 
        },

    commentary: {
        type: DataTypes.STRING(100), 
        allowNull: true, 
        },

},
{
    timestamps: false
},

)

    inventory.associate = (models) => {
        inventory.hasOne(models.assets, {
        foreignKey: 'id_inventory',
        as: 'assetData',
        });

        inventory.belongsTo(models.departments, {
        foreignKey: 'id_departments',
        targetKey: 'id_departments',
        as: 'dept',
    });
    }

export default inventory