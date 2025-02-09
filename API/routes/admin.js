import express from 'express';
import  sequelize  from '../config/db.js'; // Assurez-vous que le chemin est correct

const router = express.Router();

// Route pour mettre à jour l'encodage de la table Administrateur
router.post('/update-charset', async (req, res) => {
    try {
        await sequelize.query(`
            ALTER TABLE Administrateur 
            CONVERT TO CHARACTER SET utf8mb4 
            COLLATE utf8mb4_general_ci;
        `);

        res.status(200).json({ message: 'Charset updated to utf8mb4.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du charset :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du charset.', error });
    }
});

// Récupère le mots de passe
router.get('/password', async (req, res) => {
    try {
        const [result] = await sequelize.query(`
            SELECT MotDePasse FROM Administrateur WHERE Nom = 'Admin'
        `);

        if (result.length > 0) {
            const passwordHash = result[0].MotDePasse.trim(); // Trim ici
            console.log('Mot de passe récupéré depuis la base :', passwordHash);
            res.status(200).send(passwordHash);
        } else {
            res.status(404).send('Mot de passe non trouvé.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du mot de passe :', error);
        res.status(500).send('Erreur serveur.');
    }
});

export default router;
