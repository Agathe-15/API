import express from 'express';
import sequelize from './config/db.js';
import { Site, Employe, SitesDepartements } from './models/index.js';


const app = express();
const port = 3000;

app.use(express.json());
// CRUD Site
// GET : Récupérer tous les sites
app.get('/sites', async (req, res) => {
    try {
        const sites = await Site.findAll();
        res.status(200).json(sites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des sites.' });
    }
});

// POST : Créer un nouveau site
app.post('/sites', async (req, res) => {
    try {
        const { nom, ville, type, adresse, telephone, email } = req.body;
        const newSite = await Site.create({ nom, ville, type, adresse, telephone, email });
        res.status(201).json(newSite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du site.' });
    }
});

// GET : Récupérer un site par ID
app.get('/sites/:id', async (req, res) => {
    try {
        const site = await Site.findByPk(req.params.id);
        if (!site) {
            return res.status(404).json({ message: 'Site non trouvé.' });
        }
        res.status(200).json(site);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du site.' });
    }
});

// PUT : Mettre à jour un site
app.put('/sites/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, ville, type, adresse, telephone, email } = req.body;
        const site = await Site.findByPk(id);

        if (!site) {
            return res.status(404).json({ message: 'Site non trouvé.' });
        }

        site.nom = nom || site.nom;
        site.ville = ville || site.ville;
        site.type = type || site.type;
        site.adresse = adresse || site.adresse;
        site.telephone = telephone || site.telephone;
        site.email = email || site.email;

        await site.save();
        res.status(200).json(site);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du site.' });
    }
});

// DELETE : Supprimer un site
app.delete('/sites/:id', async (req, res) => {
    try {
        const site = await Site.findByPk(req.params.id);

        if (!site) {
            return res.status(404).json({ message: 'Site non trouvé.' });
        }

        await site.destroy();
        res.status(204).send(); // Pas de contenu
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du site.' });
    }
});

// CRUD Employe

// GET : Récupérer tous les employés
app.get('/employes', async (req, res) => {
    try {
        const employes = await Employe.findAll();
        res.status(200).json(employes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des employés.' });
    }
});

// POST : Créer un nouvel employé
app.post('/employes', async (req, res) => {
    try {
        const { nom, prenom, poste, telephone, email, site_id, date_embauche } = req.body;
        const newEmploye = await Employe.create({
            nom,
            prenom,
            poste,
            telephone,
            email,
            site_id,
            date_embauche
        });
        res.status(201).json(newEmploye);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'employé.' });
    }
});

// GET : Récupérer un employé par ID
app.get('/employes/:id', async (req, res) => {
    try {
        const employe = await Employe.findByPk(req.params.id);
        if (!employe) {
            return res.status(404).json({ message: 'Employé non trouvé.' });
        }
        res.status(200).json(employe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'employé.' });
    }
});

// PUT : Mettre à jour un employé
app.put('/employes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, poste, telephone, email, site_id, date_embauche } = req.body;
        const employe = await Employe.findByPk(id);

        if (!employe) {
            return res.status(404).json({ message: 'Employé non trouvé.' });
        }

        employe.nom = nom || employe.nom;
        employe.prenom = prenom || employe.prenom;
        employe.poste = poste || employe.poste;
        employe.telephone = telephone || employe.telephone;
        employe.email = email || employe.email;
        employe.site_id = site_id || employe.site_id;
        employe.date_embauche = date_embauche || employe.date_embauche;

        await employe.save();
        res.status(200).json(employe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'employé.' });
    }
});

// DELETE : Supprimer un employé
app.delete('/employes/:id', async (req, res) => {
    try {
        const employe = await Employe.findByPk(req.params.id);

        if (!employe) {
            return res.status(404).json({ message: 'Employé non trouvé.' });
        }

        await employe.destroy();
        res.status(204).send(); // Pas de contenu
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'employé.' });
    }
});
// CRUD Sites_Departements

// GET : Récupérer toutes les associations sites-départements
app.get('/sites_departements', async (req, res) => {
    try {
        const sitesDepartements = await SitesDepartements.findAll();
        res.status(200).json(sitesDepartements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des associations.' });
    }
});

// POST : Créer une association entre un site et un département
app.post('/sites_departements', async (req, res) => {
    try {
        const { site_id, departement_id } = req.body;
        const newAssociation = await SitesDepartements.create({ site_id, departement_id });
        res.status(201).json(newAssociation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'association.' });
    }
});

// DELETE : Supprimer une association site-département
app.delete('/sites_departements/:id', async (req, res) => {
    try {
        const association = await SitesDepartements.findByPk(req.params.id);

        if (!association) {
            return res.status(404).json({ message: 'Association non trouvée.' });
        }

        await association.destroy();
        res.status(204).send(); // Pas de contenu
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'association.' });
    }
});


app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});

sequelize.sync({ alter: true })
    .then(() => console.log('Les modèles sont synchronisés avec la base de données.'))
    .catch(err => console.error('Erreur de synchronisation des modèles :', err));
