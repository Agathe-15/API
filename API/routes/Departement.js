import express from 'express';
import { Departement, Employe } from '../models/index.js'; // Assurez-vous que le mod�le existe
import { logger } from '../utils/logger.js'; // ? Ajout du logger

console.log('Module d�partements charg� avec succ�s.');

const router = express.Router();

// Endpoint pour r�cup�rer tous les d�partements
router.get('/', async (req, res) => {
    try {
        const departements = await Departement.findAll();
        logger.info(`?? R�cup�ration des d�partements (${departements.length} trouv�s)`);
        res.status(200).json(departements);
    } catch (error) {
        logger.error(`? Erreur lors de la r�cup�ration des d�partements : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// Endpoint pour ajouter un d�partement
router.post('/', async (req, res) => {
    const { nom } = req.body;

    if (!nom) {
        logger.warn("?? Tentative d'ajout d'un d�partement sans nom !");
        return res.status(400).json({ message: "Le nom du d�partement est obligatoire." });
    }

    try {
        const newDepartement = await Departement.create({ nom });
        logger.info(`? D�partement ajout� : ${newDepartement.nom} (ID=${newDepartement.departement_id})`);
        res.status(201).json(newDepartement);
    } catch (error) {
        logger.error(`? Erreur lors de l'ajout du d�partement : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// Endpoint pour modifier un d�partement
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;

    if (!nom) {
        logger.warn(`?? Tentative de modification du d�partement ID=${id} sans nouveau nom !`);
        return res.status(400).json({ message: "Le nom du d�partement est obligatoire." });
    }

    try {
        const departement = await Departement.findByPk(id);
        if (!departement) {
            logger.warn(`? D�partement ID=${id} introuvable !`);
            return res.status(404).json({ message: 'D�partement non trouv�.' });
        }

        departement.nom = nom;
        await departement.save();
        logger.info(`? D�partement modifi� : ${departement.nom} (ID=${id})`);
        res.status(200).json(departement);
    } catch (error) {
        logger.error(`? Erreur lors de la modification du d�partement ID=${id} : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});


// Endpoint pour supprimer un d�partement
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // ?? V�rifie s'il y a des employ�s li�s � ce d�partement
        const employes = await Employe.findAll({ where: { departement_id: id } });

        if (employes.length > 0) {
            console.log(`? Impossible de supprimer le d�partement ID=${id}, ${employes.length} employ�(s) y sont rattach�s.`);
            return res.status(400).json({
                message: `Impossible de supprimer : ${employes.length} employ�(s) sont encore rattach�s � ce d�partement.`
            });
        }

        // ? Aucun employ� li�, on peut supprimer
        const deleted = await Departement.destroy({ where: { departement_id: id } });

        if (deleted) {
            console.log(`? D�partement ID=${id} supprim� avec succ�s.`);
            return res.status(204).send();
        } else {
            return res.status(404).json({ message: "D�partement non trouv�." });
        }

    } catch (error) {
        console.error("? Erreur lors de la suppression du d�partement :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

export default router;
