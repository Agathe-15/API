import express from 'express';
import sequelize from './config/db.js';
import { Site, Employe, SitesDepartements } from './models/index.js';


const app = express();
const port = 3000;

app.use(express.json());
// CRUD Site
// GET : R�cup�rer tous les sites
app.get('/sites', async (req, res) => {
    try {
        const sites = await Site.findAll();
        res.status(200).json(sites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration des sites.' });
    }
});

// POST : Cr�er un nouveau site
app.post('/sites', async (req, res) => {
    try {
        const { nom, ville, type, adresse, telephone, email } = req.body;
        const newSite = await Site.create({ nom, ville, type, adresse, telephone, email });
        res.status(201).json(newSite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la cr�ation du site.' });
    }
});

// GET : R�cup�rer un site par ID
app.get('/sites/:id', async (req, res) => {
    try {
        const site = await Site.findByPk(req.params.id);
        if (!site) {
            return res.status(404).json({ message: 'Site non trouv�.' });
        }
        res.status(200).json(site);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration du site.' });
    }
});

// PUT : Mettre � jour un site
app.put('/sites/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, ville, type, adresse, telephone, email } = req.body;
        const site = await Site.findByPk(id);

        if (!site) {
            return res.status(404).json({ message: 'Site non trouv�.' });
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
        res.status(500).json({ message: 'Erreur lors de la mise � jour du site.' });
    }
});

// DELETE : Supprimer un site
app.delete('/sites/:id', async (req, res) => {
    try {
        const site = await Site.findByPk(req.params.id);

        if (!site) {
            return res.status(404).json({ message: 'Site non trouv�.' });
        }

        await site.destroy();
        res.status(204).send(); // Pas de contenu
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du site.' });
    }
});

// CRUD Employe

// GET : R�cup�rer tous les employ�s
app.get('/employes', async (req, res) => {
    try {
        const employes = await Employe.findAll();
        res.status(200).json(employes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration des employ�s.' });
    }
});

// POST : Cr�er un nouvel employ�
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
        res.status(500).json({ message: 'Erreur lors de la cr�ation de l\'employ�.' });
    }
});

// GET : R�cup�rer un employ� par ID
app.get('/employes/:id', async (req, res) => {
    try {
        const employe = await Employe.findByPk(req.params.id);
        if (!employe) {
            return res.status(404).json({ message: 'Employ� non trouv�.' });
        }
        res.status(200).json(employe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration de l\'employ�.' });
    }
});

// PUT : Mettre � jour un employ�
app.put('/employes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, poste, telephone, email, site_id, date_embauche } = req.body;
        const employe = await Employe.findByPk(id);

        if (!employe) {
            return res.status(404).json({ message: 'Employ� non trouv�.' });
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
        res.status(500).json({ message: 'Erreur lors de la mise � jour de l\'employ�.' });
    }
});

// DELETE : Supprimer un employ�
app.delete('/employes/:id', async (req, res) => {
    try {
        const employe = await Employe.findByPk(req.params.id);

        if (!employe) {
            return res.status(404).json({ message: 'Employ� non trouv�.' });
        }

        await employe.destroy();
        res.status(204).send(); // Pas de contenu
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'employ�.' });
    }
});
// CRUD Sites_Departements

// GET : R�cup�rer toutes les associations sites-d�partements
app.get('/sites_departements', async (req, res) => {
    try {
        const sitesDepartements = await SitesDepartements.findAll();
        res.status(200).json(sitesDepartements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration des associations.' });
    }
});

// POST : Cr�er une association entre un site et un d�partement
app.post('/sites_departements', async (req, res) => {
    try {
        const { site_id, departement_id } = req.body;
        const newAssociation = await SitesDepartements.create({ site_id, departement_id });
        res.status(201).json(newAssociation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la cr�ation de l\'association.' });
    }
});

// DELETE : Supprimer une association site-d�partement
app.delete('/sites_departements/:id', async (req, res) => {
    try {
        const association = await SitesDepartements.findByPk(req.params.id);

        if (!association) {
            return res.status(404).json({ message: 'Association non trouv�e.' });
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
    .then(() => console.log('Les mod�les sont synchronis�s avec la base de donn�es.'))
    .catch(err => console.error('Erreur de synchronisation des mod�les :', err));
