import express from 'express';
import { sequelize } from '../config/db.js';

const router = express.Router();

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

export default router;