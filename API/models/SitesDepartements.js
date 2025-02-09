import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const SitesDepartements = sequelize.define('SitesDepartements', {
    site_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    departement_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Sites_Departements',
    timestamps: false
});

// Définir les relations dans une fonction séparée
export const initSitesDepartementsAssociations = (Site, Departement) => {
    SitesDepartements.belongsTo(Site, { foreignKey: 'site_id' });
    SitesDepartements.belongsTo(Departement, { foreignKey: 'departement_id' });
};

export default SitesDepartements;
