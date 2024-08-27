module.exports = (sequelize, DataType) => {
  // Define the Formation model with its attributes.
  const Formation = sequelize.define("Formation", {
    titre: {
      type: DataType.STRING, // Title of the formation.
      allowNull: true // Field can be null.
    },
    description: {
      type: DataType.STRING, // Description of the formation.
      allowNull: true // Field can be null.
    },
    img: {
      type: DataType.STRING, // URL or path to the formation's image.
      allowNull: true // Field can be null.
    },
    pointsf: {
      type: DataType.INTEGER, // Points or rating for the formation.
      allowNull: true // Field can be null.
    },
    modeformation: {
      type: DataType.STRING, // Mode of the formation (e.g., online, in-person).
      allowNull: true // Field can be null.
    },
    besoin: {
      type: DataType.STRING, // Needs or requirements for the formation.
      allowNull: true // Field can be null.
    },
    domaine: {
      type: DataType.STRING, // Domain or field of the formation.
      allowNull: true // Field can be null.
    },
  }, {
    charset: 'utf8mb4', // Character set to support a wide range of characters.
    collate: 'utf8mb4_general_ci' // Collation for case-insensitive comparison.
  });

  // Define associations for the Formation model.
  Formation.associate = models => {
    Formation.belongsTo(models.Formateur, {
      onDelete: 'cascade', // Delete related formation if the formateur is deleted.
      onUpdate: 'cascade' // Update foreign key if the formateur is updated.
    });

    Formation.hasOne(models.Participation, {
      onDelete: 'cascade', // Delete related participation if the formation is deleted.
      onUpdate: 'cascade' // Update foreign key if the formation is updated.
    });
  };

  return Formation; // Return the defined model.
};
