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

// Déclaration des routes
app.use('/api/admin', adminRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/sites_departements', sitesDepartementsRoutes);
app.use('/api/departements', departementRoutes); // Utilisation de la route des départements

// Lancement du serveur
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});

// Synchronisation des modèles avec la base de données
sequelize.sync({ alter: true })
    .then(() => console.log('Les modèles sont synchronisés avec la base de données.'))
    .catch(err => console.error('Erreur de synchronisation des modèles :', err));


// Utilisation explicite pour éviter les erreurs ESLint
console.log(Site.name, Employe.name);