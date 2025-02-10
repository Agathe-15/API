import express from 'express';
import { Site } from '../models/index.js'; // Assurez-vous que le mod�le Site est correctement import�
import { adminLock } from '../routes/admin.js';

const router = express.Router(); // Utilisez router au lieu de app

// GET : R�cup�rer tous les sites
router.get('/', async (req, res) => {
    try {
        const sites = await Site.findAll();
        res.status(200).json(sites);
    } catch (error) {
        console.error('Erreur lors de la r�cup�ration des sites :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// POST : Cr�er un nouveau site
router.post('/', async (req, res) => {
    try {
        const { nom, ville, type, adresse, telephone, email } = req.body;
        const newSite = await Site.create({ nom, ville, type, adresse, telephone, email });
        res.status(201).json(newSite);
    } catch (error) {
        console.error('Erreur lors de la cr�ation du site :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// GET : R�cup�rer un site par ID
router.get('/:id', async (req, res) => {
    try {
        const site = await Site.findByPk(req.params.id);
        if (!site) {
            return res.status(404).json({ message: 'Site non trouv�.' });
        }
        res.status(200).json(site);
    } catch (error) {
        console.error('Erreur lors de la r�cup�ration du site :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// PUT : Mettre � jour un site
router.put('/:id', async (req, res) => {
    if (adminLock) {
        return res.status(423).json({ message: "? Modification verrouill�e. Attendez la fin de l'�dition." });
    }
    try {
        const { id } = req.params;
        const { nom, ville, type, adresse, telephone, email } = req.body;
        const site = await Site.findByPk(id);

        if (!site) {
            return res.status(404).json({ message: 'Site non trouv�.' });
        }

        site.nom = nom || site.nom;
        site.ville = ville || site.ville;
        site.type = type || site.type;
        site.adresse = adresse || site.adresse;
        site.telephone = telephone || site.telephone;
        site.email = email || site.email;

        await site.save();
        res.status(200).json({ message: "? Site mis � jour avec succ�s.", site });
    } catch (error) {
        console.error('? Erreur lors de la mise � jour du site :', error);
        res.status(500).json({ message: '? Erreur serveur.', error });
    }
});

// DELETE : Supprimer un site
router.delete('/:id', async (req, res) => {
    try {
        const site = await Site.findByPk(req.params.id);

        if (!site) {
            return res.status(404).json({ message: 'Site non trouv�.' });
        }

        await site.destroy();
        res.status(204).send(); // Pas de contenu
    } catch (error) {
        console.error('Erreur lors de la suppression du site :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});


export default router;
