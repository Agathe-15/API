import express from 'express';
 //import  Employe  from '../models/index.js';
import { SitesDepartements, Departement } from '../models/index.js';


const router = express.Router();

// GET : R�cup�rer les d�partements associ�s � un site sp�cifique
router.get('/sites/:siteId/departements', async (req, res) => {
    const { siteId } = req.params;

    try {
        const departements = await Departement.findAll({
            include: [{
                model: SitesDepartements,
                where: { site_id: siteId },
                attributes: [] // Ignore les champs de la table interm�diaire
            }]
        });

        res.status(200).json(departements);
    } catch (error) {
        console.error('Erreur lors de la r�cup�ration des d�partements li�s au site :', error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});


// GET : R�cup�rer toutes les associations sites-d�partements
router.get('/sites_departements', async (req, res) => {
    try {
        const sitesDepartements = await SitesDepartements.findAll();
        res.status(200).json(sitesDepartements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration des associations.' });
    }
});

router.get('/', async (req, res) => {
    try {
        console.log('Route GET /sites_departements appel�e');
        console.log('SitesDepartements:', SitesDepartements);

        const sitesDepartements = await SitesDepartements.findAll();
        res.status(200).json(sitesDepartements);
    } catch (error) {
        console.error('Erreur lors de la r�cup�ration :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// POST : Cr�er une association entre un site et un d�partement
router.post('/sites_departements', async (req, res) => {
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
router.delete('/sites_departements/:id', async (req, res) => {
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