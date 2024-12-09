import express from 'express';
import sequelize from './config/db.js';
import { Site, Employe, SitesDepartements } from './models/index.js';
import adminRoutes from './routes/admin.js';
import employeRoutes from './routes/employe.js';
import siteRoutes from './routes/site.js';
import sitesDepartementsRoutes from './routes/sites_departements.js';

const app = express();
const port = 3000;

app.use(express.json());

// Déclaration des routes admin
app.use('/api/admin', adminRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/sites_departements', sitesDepartementsRoutes);


app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});

sequelize.sync({ alter: true })
    .then(() => console.log('Les modèles sont synchronisés avec la base de données.'))
    .catch(err => console.error('Erreur de synchronisation des modèles :', err));
