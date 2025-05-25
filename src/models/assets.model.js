import { Sequelize, DataTypes }  from 'sequelize'
import { pool, sequelize } from '../db.js';

const assets =sequelize.define('assets',{

    id_assets: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    id_inventory: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'inventory', 
            key: 'id_inventory',
        }
    },
    type: {
        type: DataTypes.ENUM('furniture','equipment', 'vehicles'), 
        allowNull:false, 
    },

    classification: {
        type: DataTypes.STRING(50),
        allowNull:false,
    },

    description: {
        type: DataTypes.STRING(200),
        allowNull: true, 
    },

    color: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },

    brand: {
        type: DataTypes.STRING(20),
        allowNull: true, 
    },

    model: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },

    serial: {
        type: DataTypes.STRING(20),
        allowNull: true, 
    },

    height: {
        type: DataTypes.DOUBLE, 
        allowNull: true, 
    },

    width: {
        type: DataTypes.DOUBLE,
        allowNull: true, 
    },

    depth: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },

    plate: {
        type: DataTypes.STRING(20),
        allowNull: true, 
    },

    bodywork: {
        type: DataTypes.STRING(50),
        allowNull: true, 
    },

    engine: {
        type: DataTypes.STRING(50),
        allowNull: true, 
    },

    year_of_the_vehicle: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },

    acquisition_value: {
        type: DataTypes.DOUBLE, 
        allowNull: true,
    },

    use_status: {
        type: DataTypes.ENUM('optimal', 'average', 'appalling'), 
        allowNull: true, 
    },

    conservation_status: {
        type: DataTypes.ENUM('operational', 'inoperative'), 
        allowNull: true, 
    },

    observation: {
        type: DataTypes.STRING(200),
        allowNull: true, 
    },

    physical_location: { // Typo in the image, assuming it's 'physical_location'
        type: DataTypes.STRING(100),
        allowNull:false, 
    },

    direction_dependency: { 
        type: DataTypes.STRING(100),
        allowNull: false, 
    },

    level: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    analyst: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },



},
{
    timestamps: false
},


)

assets.associate = (models) => {

    assets.belongsTo(models.inventory, {
        foreignKey: 'id_inventory',
        targetKey: 'id_inventory',
        as: 'inv', //
    });

};

export default assets