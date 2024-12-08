import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Annuaire', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql', // Remplacez par 'postgres', 'sqlite', etc. si n�cessaire
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion r�ussie � la base de donn�es.');
    } catch (error) {
        console.error('Impossible de se connecter � la base de donn�es :', error);
    }
};

// Appelez la fonction pour vous connecter � la base de donn�es
connectToDatabase();

export default sequelize; // Exportez uniquement l'instance configur�e
