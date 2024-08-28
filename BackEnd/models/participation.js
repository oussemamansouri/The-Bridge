module.exports = (sequelize, DataType) => {
    // Define the Participation model with its attributes.
    const Participation = sequelize.define("Participation", {
      ReceiverId: {
        type: DataType.BIGINT, // ID of the receiver (e.g., another formateur).
        allowNull: true // Field can be null.
      }
    }, {
      charset: 'utf8mb4', // Character set to support a wide range of characters.
      collate: 'utf8mb4_general_ci' // Collation for case-insensitive comparison.
    });
  
    // Define associations for the Participation model.
    Participation.associate = models => {
      // Association with Formateur (sender) as 'Formateur'.
      Participation.belongsTo(models.Formateur, {
        as: 'Formateur',
        foreignKey: 'FormateurId', // Foreign key in Participation table.
        onDelete: 'cascade', // Delete related participation if the formateur is deleted.
        onUpdate: 'cascade' // Update foreign key if the formateur is updated.
      });
  
      // Association with Formateur (receiver) as 'Friend'.
      Participation.belongsTo(models.Formateur, {
        as: 'Friend',
        foreignKey: 'ReceiverId', // Foreign key in Participation table.
        onDelete: 'cascade', // Delete related participation if the formateur is deleted.
        onUpdate: 'cascade' // Update foreign key if the formateur is updated.
      });
  
      // Association with Formation.
      Participation.belongsTo(models.Formation, {
        onDelete: 'cascade', // Delete related participation if the formation is deleted.
        onUpdate: 'cascade' // Update foreign key if the formation is updated.
      });
    };
  
    return Participation; // Return the defined model.
  };
  