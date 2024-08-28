module.exports = (sequelize, DataType) => {
    // Define the Pack model with its attributes.
    const Pack = sequelize.define("Pack", {
      titre: {
        type: DataType.STRING, // Title of the pack.
        allowNull: true // Field can be null.
      },
      description: {
        type: DataType.STRING, // General description of the pack.
        allowNull: true // Field can be null.
      },
      description1: {
        type: DataType.STRING, // Additional description part 1.
        allowNull: true // Field can be null.
      },
      description2: {
        type: DataType.STRING, // Additional description part 2.
        allowNull: true // Field can be null.
      },
      description3: {
        type: DataType.STRING, // Additional description part 3.
        allowNull: true // Field can be null.
      },
      prix: {
        type: DataType.FLOAT, // Price of the pack.
        allowNull: true // Field can be null.
      },
      points: {
        type: DataType.INTEGER, // Points associated with the pack.
        allowNull: true // Field can be null.
      },
    }, {
      charset: 'utf8mb4', // Character set to support a wide range of characters.
      collate: 'utf8mb4_general_ci' // Collation for case-insensitive comparison.
    });
  
    return Pack; // Return the defined model.
  };
  