import express from 'express';
import sequelize from '../config/db.js'; // Assurez-vous que le chemin est correct

const router = express.Router();
let adminLock = false; // ?? Variable pour le verrouillage

// ? Mettre à jour l'encodage de la table Administrateur
router.post('/update-charset', async (req, res) => {
    try {
        await sequelize.query(`
            ALTER TABLE Administrateur 
            CONVERT TO CHARACTER SET utf8mb4 
            COLLATE utf8mb4_general_ci;
        `);
        res.status(200).json({ message: 'Charset updated to utf8mb4.' });
    } catch (error) {
        console.error('? Erreur lors de la mise à jour du charset :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du charset.', error });
    }
});

// ? Vérifier si la base est verrouillée
router.get('/lock-status', (req, res) => {
    res.json({ locked: adminLock });
});

// ? Verrouiller la base pour modification (un seul admin à la fois)
router.post('/lock', (req, res) => {
    console.log("?? Tentative de verrouillage reçue !");
    console.log("?? Body reçu :", req.body);  // ?? Voir si le body est vide

    // ? Modifier cette condition pour éviter l'erreur
    if (!req.is('application/json')) {
        return res.status(400).json({ message: "? Mauvais format : JSON attendu." });
    }

    if (adminLock) {
        return res.status(423).json({ message: "? Un autre administrateur est déjà en modification." });
    }

    adminLock = true;
    console.log("? Base verrouillée.");
    res.status(200).json({ message: "?? Base verrouillée pour modification." });
});


// ? Déverrouiller la base après modification
router.post('/unlock', (req, res) => {
    adminLock = false;
    console.log("? Base débloquée.");
    res.status(200).json({ message: "? Base débloquée." });
});

// ? Récupérer le mot de passe de l'administrateur
router.get('/password', async (req, res) => {
    try {
        const [result] = await sequelize.query(`
            SELECT MotDePasse FROM Administrateur WHERE Nom = 'Admin'
        `);

        if (result.length > 0) {
            const passwordHash = result[0].MotDePasse.trim(); // Trim ici
            console.log('?? Mot de passe récupéré depuis la base :', passwordHash);
            res.status(200).send(passwordHash);
        } else {
            res.status(404).send('? Mot de passe non trouvé.');
        }
    } catch (error) {
        console.error('? Erreur lors de la récupération du mot de passe :', error);
        res.status(500).send('? Erreur serveur.');
    }
});

export { adminLock };
export default router;
