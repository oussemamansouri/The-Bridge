module.exports = (sequelize, DataType) => {
    // Define the Moderateur model with its attributes.
    const Moderateur = sequelize.define("Moderateur", {
      firstname: {
        type: DataType.STRING, // First name of the moderator.
        allowNull: true // Field can be null.
      },
      lastname: {
        type: DataType.STRING, // Last name of the moderator.
        allowNull: true // Field can be null.
      },
      username: {
        type: DataType.STRING, // Username of the moderator.
        allowNull: true // Field can be null.
      },
      password: {
        type: DataType.STRING, // Password for the moderator.
        allowNull: true // Field can be null.
      },
      img: {
        type: DataType.STRING, // URL or path to the moderator's image.
        allowNull: true // Field can be null.
      },
      tel: {
        type: DataType.INTEGER, // Telephone number of the moderator.
        allowNull: true // Field can be null.
      },
      email: {
        type: DataType.STRING, // Email address of the moderator.
        allowNull: true // Field can be null.
      },
      role: {
        type: DataType.STRING, // Role of the moderator.
        allowNull: true // Field can be null.
      },
    }, {
      charset: 'utf8mb4', // Character set to support a wide range of characters.
      collate: 'utf8mb4_general_ci' // Collation for case-insensitive comparison.
    });
  
    return Moderateur; // Return the defined model.
  };
  