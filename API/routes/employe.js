import express from 'express';
import { Employe, Site, Departement } from '../models/index.js';
import { logger } from '../utils/logger.js'; // ? Correction de l'import


const router = express.Router();

// ? GET : R�cup�rer tous les employ�s (avec filtres site_id & departement_id)
router.get('/', async (req, res) => {
    try {
        const { site_id, departement_id } = req.query;
        let whereClause = {};

        if (site_id) {
            whereClause.site_id = site_id;
            logger.info(`?? Filtrage des employ�s pour site_id=${site_id}`);
        }
        if (departement_id) {
            whereClause.departement_id = departement_id;
            logger.info(`?? Filtrage des employ�s pour departement_id=${departement_id}`);
        }

        const employes = await Employe.findAll({
            where: whereClause,
            include: [
                { model: Site, as: 'SiteEmploye', attributes: ['site_id', 'nom', 'ville'] },
                { model: Departement, as: 'EmployeDepartement', attributes: ['departement_id', 'nom'] }
            ],
        });

        logger.info(`? Nombre d'employ�s trouv�s : ${employes.length}`);
        res.status(200).json(employes);
    } catch (error) {
        logger.error(`? Erreur lors de la r�cup�ration des employ�s : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// ? POST : Ajouter un employ�
router.post('/', async (req, res) => {
    logger.info(`?? Tentative d'ajout d'un employ� : ${JSON.stringify(req.body)}`);

    const { nom, prenom, email, telephone, departement_id, site_id, date_embauche } = req.body;
    if (!nom || !prenom || !email || !telephone || !departement_id || !site_id || !date_embauche) {
        logger.warn("? Champs obligatoires manquants !");
        return res.status(400).json({ message: 'Champs obligatoires manquants.' });
    }

    try {
        const nouvelEmploye = await Employe.create(req.body);
        logger.info(`? Employ� ajout� : ${nouvelEmploye.nom} ${nouvelEmploye.prenom} (ID=${nouvelEmploye.employe_id})`);
        res.status(201).json({ message: 'Employ� ajout� avec succ�s', employe: nouvelEmploye });
    } catch (error) {
        logger.error(`? Erreur lors de l'ajout de l'employ� : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// ? PUT : Modifier un employ�
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    logger.info(`?? Modification de l'employ� ID=${id}`);

    try {
        const employe = await Employe.findByPk(id);
        if (!employe) {
            logger.warn(`? Employ� ID=${id} introuvable.`);
            return res.status(404).json({ message: 'Employ� non trouv�.' });
        }

        await employe.update(req.body);
        logger.info(`? Employ� ID=${id} modifi� avec succ�s.`);
        res.status(200).json(employe);
    } catch (error) {
        logger.error(`? Erreur lors de la modification de l'employ� : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// ? DELETE : Supprimer un employ�
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    logger.info(`?? Suppression de l'employ� ID=${id}`);

    try {
        const employe = await Employe.findByPk(id);
        if (!employe) {
            logger.warn(`? Employ� ID=${id} introuvable.`);
            return res.status(404).json({ message: 'Employ� non trouv�.' });
        }

        await employe.destroy();
        logger.info(`? Employ� ID=${id} supprim� avec succ�s.`);
        res.status(204).send();
    } catch (error) {
        logger.error(`? Erreur lors de la suppression de l'employ� : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

export default router;
