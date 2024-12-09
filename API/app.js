import express from 'express';
import sequelize from './config/db.js';
import { Site, Employe, SitesDepartements } from './models/index.js';
import adminRoutes from './routes/admin.js';

const app = express();
const port = 3000;

app.use(express.json());

// D�claration des routes admin
app.use('/api/admin', adminRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/sites_departements', sitesDepartementsRoutes);


app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});

sequelize.sync({ alter: true })
    .then(() => console.log('Les mod�les sont synchronis�s avec la base de donn�es.'))
    .catch(err => console.error('Erreur de synchronisation des mod�les :', err));
