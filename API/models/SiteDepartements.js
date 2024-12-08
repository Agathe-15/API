import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Site from './Site.js';

const SitesDepartements = sequelize.define('SitesDepartements', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        allowNull: false // Foreign key to departements, make sure to link later
    }
}, {
    tableName: 'Sites_Departements',
    timestamps: false
});

export default SitesDepartements;
