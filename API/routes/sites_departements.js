import express from 'express';
 //import  Employe  from '../models/index.js';
import { SitesDepartements, Departement } from '../models/index.js';


const router = express.Router();

// GET : Récupérer les départements associés à un site spécifique
router.get('/sites/:siteId/departements', async (req, res) => {
    const { siteId } = req.params;

    try {
        const departements = await Departement.findAll({
            include: [{
                model: SitesDepartements,
                where: { site_id: siteId },
                attributes: [] // Ignore les champs de la table intermédiaire
            }]
        });

        res.status(200).json(departements);
    } catch (error) {
        console.error('Erreur lors de la récupération des départements liés au site :', error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});


// GET : Récupérer toutes les associations sites-départements
router.get('/sites_departements', async (req, res) => {
    try {
        const sitesDepartements = await SitesDepartements.findAll();
        res.status(200).json(sitesDepartements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des associations.' });
    }
});

router.get('/', async (req, res) => {
    try {
        console.log('Route GET /sites_departements appelée');
        console.log('SitesDepartements:', SitesDepartements);

        const sitesDepartements = await SitesDepartements.findAll();
        res.status(200).json(sitesDepartements);
    } catch (error) {
        console.error('Erreur lors de la récupération :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// POST : Créer une association entre un site et un département
router.post('/sites_departements', async (req, res) => {
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
router.delete('/sites_departements/:id', async (req, res) => {
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

export default router;