import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Employe from './Employe.js';

const Departement = sequelize.define('Departement', {
    departement_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'Departements',
    timestamps: false,
    underscored: true,
});


export default Departement;
