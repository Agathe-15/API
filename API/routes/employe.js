import express from 'express';
import { Employe } from '../models/index.js';

const router = express.Router(); // Utilisation de router, pas de app

// GET : Récupérer tous les employés
router.get('/', async (req, res) => {
    try {
        const employes = await Employe.findAll();
        res.status(200).json(employes);
    } catch (error) {
        console.error('Erreur lors de la récupération des employés :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// POST : Créer un nouvel employé
router.post('/', async (req, res) => {
    try {
        const { nom, prenom, poste, telephone, email, site_id, date_embauche } = req.body;
        const newEmploye = await Employe.create({
            nom,
            prenom,
            poste,
            telephone,
            email,
            site_id,
            date_embauche,
        });
        res.status(201).json(newEmploye);
    } catch (error) {
        console.error('Erreur lors de la création de l\'employé :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// GET : Récupérer un employé par ID
router.get('/:id', async (req, res) => {
    try {
        const employe = await Employe.findByPk(req.params.id);
        if (!employe) {
            return res.status(404).json({ message: 'Employé non trouvé.' });
        }
        res.status(200).json(employe);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'employé :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// PUT : Mettre à jour un employé
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, poste, telephone, email, site_id, date_embauche } = req.body;
        const employe = await Employe.findByPk(id);

        if (!employe) {
            return res.status(404).json({ message: 'Employé non trouvé.' });
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
        console.error('Erreur lors de la mise à jour de l\'employé :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// DELETE : Supprimer un employé
router.delete('/:id', async (req, res) => {
    try {
        const employe = await Employe.findByPk(req.params.id);

        if (!employe) {
            return res.status(404).json({ message: 'Employé non trouvé.' });
        }

        await employe.destroy();
        res.status(204).send(); // Pas de contenu
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'employé :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

export default router;
