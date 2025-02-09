import express from 'express';
import { Employe, Site, Departement } from '../models/index.js';
import { logger } from '../utils/logger.js'; // ? Correction de l'import


const router = express.Router();

// ? GET : Récupérer tous les employés (avec filtres site_id & departement_id)
router.get('/', async (req, res) => {
    try {
        const { site_id, departement_id } = req.query;
        let whereClause = {};

        if (site_id) {
            whereClause.site_id = site_id;
            logger.info(`?? Filtrage des employés pour site_id=${site_id}`);
        }
        if (departement_id) {
            whereClause.departement_id = departement_id;
            logger.info(`?? Filtrage des employés pour departement_id=${departement_id}`);
        }

        const employes = await Employe.findAll({
            where: whereClause,
            include: [
                { model: Site, as: 'SiteEmploye', attributes: ['site_id', 'nom', 'ville'] },
                { model: Departement, as: 'EmployeDepartement', attributes: ['departement_id', 'nom'] }
            ],
        });

        logger.info(`? Nombre d'employés trouvés : ${employes.length}`);
        res.status(200).json(employes);
    } catch (error) {
        logger.error(`? Erreur lors de la récupération des employés : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// ? POST : Ajouter un employé
router.post('/', async (req, res) => {
    logger.info(`?? Tentative d'ajout d'un employé : ${JSON.stringify(req.body)}`);

    const { nom, prenom, email, telephone, departement_id, site_id, date_embauche } = req.body;
    if (!nom || !prenom || !email || !telephone || !departement_id || !site_id || !date_embauche) {
        logger.warn("? Champs obligatoires manquants !");
        return res.status(400).json({ message: 'Champs obligatoires manquants.' });
    }

    try {
        const nouvelEmploye = await Employe.create(req.body);
        logger.info(`? Employé ajouté : ${nouvelEmploye.nom} ${nouvelEmploye.prenom} (ID=${nouvelEmploye.employe_id})`);
        res.status(201).json({ message: 'Employé ajouté avec succès', employe: nouvelEmploye });
    } catch (error) {
        logger.error(`? Erreur lors de l'ajout de l'employé : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// ? PUT : Modifier un employé
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    logger.info(`?? Modification de l'employé ID=${id}`);

    try {
        const employe = await Employe.findByPk(id);
        if (!employe) {
            logger.warn(`? Employé ID=${id} introuvable.`);
            return res.status(404).json({ message: 'Employé non trouvé.' });
        }

        await employe.update(req.body);
        logger.info(`? Employé ID=${id} modifié avec succès.`);
        res.status(200).json(employe);
    } catch (error) {
        logger.error(`? Erreur lors de la modification de l'employé : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// ? DELETE : Supprimer un employé
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    logger.info(`?? Suppression de l'employé ID=${id}`);

    try {
        const employe = await Employe.findByPk(id);
        if (!employe) {
            logger.warn(`? Employé ID=${id} introuvable.`);
            return res.status(404).json({ message: 'Employé non trouvé.' });
        }

        await employe.destroy();
        logger.info(`? Employé ID=${id} supprimé avec succès.`);
        res.status(204).send();
    } catch (error) {
        logger.error(`? Erreur lors de la suppression de l'employé : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

export default router;
