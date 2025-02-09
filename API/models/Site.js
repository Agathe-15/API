import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Site = sequelize.define('Site', {
    site_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ville: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
    },
    adresse: {
        type: DataTypes.STRING,
    },
    telephone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'Sites',
    timestamps: false,
    underscored: true,
});

export default Site;
