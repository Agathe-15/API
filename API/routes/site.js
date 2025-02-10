import express from 'express';
import { Site } from '../models/index.js'; // Assurez-vous que le modèle Site est correctement importé
import { adminLock } from '../routes/admin.js';

const router = express.Router(); // Utilisez router au lieu de app

// GET : Récupérer tous les sites
router.get('/', async (req, res) => {
    try {
        const sites = await Site.findAll();
        res.status(200).json(sites);
    } catch (error) {
        console.error('Erreur lors de la récupération des sites :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// POST : Créer un nouveau site
router.post('/', async (req, res) => {
    try {
        const { nom, ville, type, adresse, telephone, email } = req.body;
        const newSite = await Site.create({ nom, ville, type, adresse, telephone, email });
        res.status(201).json(newSite);
    } catch (error) {
        console.error('Erreur lors de la création du site :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// GET : Récupérer un site par ID
router.get('/:id', async (req, res) => {
    try {
        const site = await Site.findByPk(req.params.id);
        if (!site) {
            return res.status(404).json({ message: 'Site non trouvé.' });
        }
        res.status(200).json(site);
    } catch (error) {
        console.error('Erreur lors de la récupération du site :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// PUT : Mettre à jour un site
router.put('/:id', async (req, res) => {
    if (adminLock) {
        return res.status(423).json({ message: "? Modification verrouillée. Attendez la fin de l'édition." });
    }
    try {
        const { id } = req.params;
        const { nom, ville, type, adresse, telephone, email } = req.body;
        const site = await Site.findByPk(id);

        if (!site) {
            return res.status(404).json({ message: 'Site non trouvé.' });
        }

        site.nom = nom || site.nom;
        site.ville = ville || site.ville;
        site.type = type || site.type;
        site.adresse = adresse || site.adresse;
        site.telephone = telephone || site.telephone;
        site.email = email || site.email;

        await site.save();
        res.status(200).json({ message: "? Site mis à jour avec succès.", site });
    } catch (error) {
        console.error('? Erreur lors de la mise à jour du site :', error);
        res.status(500).json({ message: '? Erreur serveur.', error });
    }
});

// DELETE : Supprimer un site
router.delete('/:id', async (req, res) => {
    try {
        const site = await Site.findByPk(req.params.id);

        if (!site) {
            return res.status(404).json({ message: 'Site non trouvé.' });
        }

        await site.destroy();
        res.status(204).send(); // Pas de contenu
    } catch (error) {
        console.error('Erreur lors de la suppression du site :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});


export default router;
