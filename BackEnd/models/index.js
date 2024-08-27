'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename); // The name of this file (e.g., 'index.js').
const env = process.env.NODE_ENV || 'development'; // Get the current environment (default to 'development').
const config = require(__dirname + '/../config/config.json')[env]; // Load the database configuration for the current environment.
const db = {}; // Initialize an empty object to hold the database models.

let sequelize;
if (config.use_env_variable) {
  // If environment variable is used for the database connection string.
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Otherwise, use the database configuration from config.json.
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all files in the current directory, excluding this file and test files.
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Exclude hidden files (files starting with '.').
      file !== basename && // Exclude this file.
      file.slice(-3) === '.js' && // Include only JavaScript files.
      file.indexOf('.test.js') === -1 // Exclude test files.
    );
  })
  .forEach(file => {
    // Import each model file and initialize it with Sequelize.
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Add the model to the db object using its name.
  });

// Set up associations for each model (if defined).
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Call the associate method with the db object.
  }
});

db.sequelize = sequelize; // Add the Sequelize instance to the db object.
db.Sequelize = Sequelize; // Add the Sequelize constructor to the db object.

module.exports = db; // Export the db object containing the Sequelize instance and models.
