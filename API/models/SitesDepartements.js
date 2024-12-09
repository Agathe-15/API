import express from 'express';
import SitesDepartements from './SitesDepartements.js';

const router = express.Router(); // Utilisez router pour définir les routes

// GET : Récupérer toutes les associations sites-départements
router.get('/', async (req, res) => {
    try {
        const sitesDepartements = await SitesDepartements.findAll();
        res.status(200).json(sitesDepartements);
    } catch (error) {
        console.error('Erreur lors de la récupération des associations :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// POST : Créer une nouvelle association entre un site et un département
router.post('/', async (req, res) => {
    try {
        const { site_id, departement_id } = req.body;
        const newAssociation = await SitesDepartements.create({ site_id, departement_id });
        res.status(201).json(newAssociation);
    } catch (error) {
        console.error('Erreur lors de la création de l\'association :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// DELETE : Supprimer une association site-département
router.delete('/:id', async (req, res) => {
    try {
        const association = await SitesDepartements.findByPk(req.params.id);

        if (!association) {
            return res.status(404).json({ message: 'Association non trouvée.' });
        }

        await association.destroy();
        res.status(204).send(); // Pas de contenu
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'association :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

export default router;
