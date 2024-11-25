
const Sequelize = require('sequelize');



const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'Madden.db'); // Database is in the same directory

// Verify the database file exists
if (!fs.existsSync(dbPath)) {
    console.error(`Database file not found at: ${dbPath}`);
    process.exit(1); // Exit the process with an error code
}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath, // Use the resolved path
});


// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: '../Player.db'
//   });


  

async function authenticateDatabase() {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


async function syncDatabase() {
    try {
        await sequelize.sync(); 
      
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}



async function main() {
    await authenticateDatabase();
    await syncDatabase();
    console.log('Connection Sucessful');
}



module.exports =  {
    sequelize,
    syncDatabase,
};