import express from 'express';
import sequelize from './config/db.js';
import adminRoutes from './routes/admin.js';
import employeRoutes from './routes/employe.js';
import siteRoutes from './routes/site.js';
import sitesDepartementsRoutes from './routes/sites_departements.js';
import departementRoutes from './routes/departement.js';
import { Site, Employe } from './models/index.js';


const app = express();
const port = 3000;

app.use(express.json());

// D�claration des routes
app.use('/api/admin', adminRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/sites_departements', sitesDepartementsRoutes);
app.use('/api/departements', departementRoutes); // Utilisation de la route des d�partements

// Lancement du serveur
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});

// Synchronisation des mod�les avec la base de donn�es
sequelize.sync({ alter: true })
    .then(() => console.log('Les mod�les sont synchronis�s avec la base de donn�es.'))
    .catch(err => console.error('Erreur de synchronisation des mod�les :', err));


// Utilisation explicite pour �viter les erreurs ESLint
console.log(Site.name, Employe.name);