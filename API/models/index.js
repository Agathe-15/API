import Site from './Site.js';
import Employe from './Employe.js';
import SitesDepartements from './SitesDepartements.js';

// Définir les relations ici
Site.hasMany(Employe, { foreignKey: 'site_id' });
Employe.belongsTo(Site, { foreignKey: 'site_id' });

export { Site, Employe, SitesDepartements };
