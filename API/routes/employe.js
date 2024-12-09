import express from 'express';
import { Employe } from '../models/index.js';

const router = express.Router();

// GET : R�cup�rer tous les employ�s
app.get('/employes', async (req, res) => {
    try {
        const employes = await Employe.findAll();
        res.status(200).json(employes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration des employ�s.' });
    }
});

// POST : Cr�er un nouvel employ�
app.post('/employes', async (req, res) => {
    try {
        const { nom, prenom, poste, telephone, email, site_id, date_embauche } = req.body;
        const newEmploye = await Employe.create({
            nom,
            prenom,
            poste,
            telephone,
            email,
            site_id,
            date_embauche
        });
        res.status(201).json(newEmploye);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la cr�ation de l\'employ�.' });
    }
});

// GET : R�cup�rer un employ� par ID
app.get('/employes/:id', async (req, res) => {
    try {
        const employe = await Employe.findByPk(req.params.id);
        if (!employe) {
            return res.status(404).json({ message: 'Employ� non trouv�.' });
        }
        res.status(200).json(employe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration de l\'employ�.' });
    }
});

// PUT : Mettre � jour un employ�
app.put('/employes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, poste, telephone, email, site_id, date_embauche } = req.body;
        const employe = await Employe.findByPk(id);

        if (!employe) {
            return res.status(404).json({ message: 'Employ� non trouv�.' });
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
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise � jour de l\'employ�.' });
    }
});

// DELETE : Supprimer un employ�
app.delete('/employes/:id', async (req, res) => {
    try {
        const employe = await Employe.findByPk(req.params.id);

        if (!employe) {
            return res.status(404).json({ message: 'Employ� non trouv�.' });
        }

        await employe.destroy();
        res.status(204).send(); // Pas de contenu
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'employ�.' });
    }
});

export default router;