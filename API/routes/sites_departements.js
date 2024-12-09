import express from 'express';
import { Employe } from '../models/index.js';

const router = express.Router();
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

export default router;