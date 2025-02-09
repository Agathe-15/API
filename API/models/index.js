import Employe from './Employe.js';
import Site from './Site.js';
import Departement from './Departement.js';
import SitesDepartements from './SitesDepartements.js';

// Définition des relations Employe-Site
Site.hasMany(Employe, { foreignKey: 'site_id', as: 'Employes' });
Employe.belongsTo(Site, { foreignKey: 'site_id', as: 'SiteEmploye' });

// Définition des relations Employe-Departement
Departement.hasMany(Employe, { foreignKey: 'departement_id', as: 'DepartementEmployes' });
Employe.belongsTo(Departement, { foreignKey: 'departement_id', as: 'EmployeDepartement' });

// Relations pour Sites_Departements
Departement.hasMany(SitesDepartements, { foreignKey: 'departement_id', as: 'DepartementSites' });
SitesDepartements.belongsTo(Departement, { foreignKey: 'departement_id', as: 'SiteDepartement' });

Site.hasMany(SitesDepartements, { foreignKey: 'site_id', as: 'SiteDepartements' });
SitesDepartements.belongsTo(Site, { foreignKey: 'site_id', as: 'DepartementSites' });

// Définition de la relation
Departement.hasMany(Employe, { foreignKey: 'departement_id' });
Employe.belongsTo(Departement, { foreignKey: 'departement_id' });

export { Employe, Site, Departement, SitesDepartements };
console.log("? Relations Sequelize initialisées.");


