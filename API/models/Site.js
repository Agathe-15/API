import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Site = sequelize.define('Site', {
    site_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ville: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'Sites',
    timestamps: false
});

export default Site;
