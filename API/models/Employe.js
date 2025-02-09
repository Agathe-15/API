import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Site from './Site.js';
import Departement from './Departement.js';

const Employe = sequelize.define('Employe', {
    employe_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departement_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Departements',
            key: 'departement_id'
        }
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    site_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Sites',
            key: 'site_id'
        }
    },
    date_embauche: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'Employes',
    timestamps: false,
});

// Définition des relations
Employe.belongsTo(Site, { foreignKey: 'site_id', as: 'Site' });
Employe.belongsTo(Departement, { foreignKey: 'departement_id', as: 'Departement' }); // Liaison avec Departement

export default Employe;
