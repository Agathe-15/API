import express from 'express';
import { Departement, Employe } from '../models/index.js'; // Assurez-vous que le modèle existe
import { logger } from '../utils/logger.js'; // ? Ajout du logger

console.log('Module départements chargé avec succès.');

const router = express.Router();

// Endpoint pour récupérer tous les départements
router.get('/', async (req, res) => {
    try {
        const departements = await Departement.findAll();
        logger.info(`?? Récupération des départements (${departements.length} trouvés)`);
        res.status(200).json(departements);
    } catch (error) {
        logger.error(`? Erreur lors de la récupération des départements : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// Endpoint pour ajouter un département
router.post('/', async (req, res) => {
    const { nom } = req.body;

    if (!nom) {
        logger.warn("?? Tentative d'ajout d'un département sans nom !");
        return res.status(400).json({ message: "Le nom du département est obligatoire." });
    }

    try {
        const newDepartement = await Departement.create({ nom });
        logger.info(`? Département ajouté : ${newDepartement.nom} (ID=${newDepartement.departement_id})`);
        res.status(201).json(newDepartement);
    } catch (error) {
        logger.error(`? Erreur lors de l'ajout du département : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// Endpoint pour modifier un département
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;

    if (!nom) {
        logger.warn(`?? Tentative de modification du département ID=${id} sans nouveau nom !`);
        return res.status(400).json({ message: "Le nom du département est obligatoire." });
    }

    try {
        const departement = await Departement.findByPk(id);
        if (!departement) {
            logger.warn(`? Département ID=${id} introuvable !`);
            return res.status(404).json({ message: 'Département non trouvé.' });
        }

        departement.nom = nom;
        await departement.save();
        logger.info(`? Département modifié : ${departement.nom} (ID=${id})`);
        res.status(200).json(departement);
    } catch (error) {
        logger.error(`? Erreur lors de la modification du département ID=${id} : ${error.message}`);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});


// Endpoint pour supprimer un département
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // ?? Vérifie s'il y a des employés liés à ce département
        const employes = await Employe.findAll({ where: { departement_id: id } });

        if (employes.length > 0) {
            console.log(`? Impossible de supprimer le département ID=${id}, ${employes.length} employé(s) y sont rattachés.`);
            return res.status(400).json({
                message: `Impossible de supprimer : ${employes.length} employé(s) sont encore rattachés à ce département.`
            });
        }

        // ? Aucun employé lié, on peut supprimer
        const deleted = await Departement.destroy({ where: { departement_id: id } });

        if (deleted) {
            console.log(`? Département ID=${id} supprimé avec succès.`);
            return res.status(204).send();
        } else {
            return res.status(404).json({ message: "Département non trouvé." });
        }

    } catch (error) {
        console.error("? Erreur lors de la suppression du département :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

export default router;
