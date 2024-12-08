import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Site from './Site.js';

const Employe = sequelize.define('Employe', {
    employe_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    poste: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    site_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Site,
            key: 'site_id'
        },
        allowNull: false
    },
    departement_id: {
        type: DataTypes.INTEGER,
        allowNull: true // Foreign key to departements, make sure to link later
    },
    date_embauche: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'Employes',
    timestamps: false
});

export default Employe;
