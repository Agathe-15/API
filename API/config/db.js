import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Annuaire', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql', // Remplacez par 'postgres', 'sqlite', etc. si nécessaire
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion réussie à la base de données.');
    } catch (error) {
        console.error('Impossible de se connecter à la base de données :', error);
    }
};

// Appelez la fonction pour vous connecter à la base de données
connectToDatabase();

export default sequelize; // Exportez uniquement l'instance configurée
