module.exports = (sequelize, DataType) => {
  // Define the Formateur model with its attributes.
  const Formateur = sequelize.define("Formateur", {
    firstname: {
      type: DataType.STRING, // First name of the formateur.
      allowNull: true // Field can be null.
    },
    lastname: {
      type: DataType.STRING, // Last name of the formateur.
      allowNull: true // Field can be null.
    },
    email: {
      type: DataType.STRING, // Email address of the formateur.
      allowNull: true // Field can be null.
    },
    dob: {
      type: DataType.DATEONLY, // Date of birth of the formateur.
      allowNull: true // Field can be null.
    },
    address: {
      type: DataType.TEXT, // Address of the formateur.
      allowNull: true // Field can be null.
    },
    password: {
      type: DataType.STRING, // Password for the formateur.
      allowNull: true // Field can be null.
    },
    img: {
      type: DataType.STRING, // URL or path to the formateur's image.
      allowNull: true // Field can be null.
    },
    tel: {
      type: DataType.INTEGER, // Telephone number of the formateur.
      allowNull: true // Field can be null.
    },
    cv: {
      type: DataType.STRING, // URL or path to the formateur's CV.
      allowNull: true // Field can be null.
    },
    portfolio: {
      type: DataType.STRING, // URL or path to the formateur's portfolio.
      allowNull: true // Field can be null.
    },
    statu: {
      type: DataType.STRING, // Status of the formateur.
      allowNull: true // Field can be null.
    },
    linkedin: {
      type: DataType.STRING, // LinkedIn profile URL of the formateur.
      allowNull: true // Field can be null.
    },
    niveau: {
      type: DataType.STRING, // Level or qualification of the formateur.
      allowNull: true // Field can be null.
    },
    experience: {
      type: DataType.STRING, // Experience details of the formateur.
      allowNull: true // Field can be null.
    },
    role: {
      type: DataType.STRING, // Role of the formateur.
      allowNull: true // Field can be null.
    },
    points: {
      type: DataType.INTEGER, // Points or rating of the formateur.
      allowNull: true // Field can be null.
    },
  }, {
    charset: 'utf8mb4', // Character set to support a wide range of characters.
    collate: 'utf8mb4_general_ci' // Collation for case-insensitive comparison.
  });

  // Define associations for the Formateur model.
  Formateur.associate = models => {
    Formateur.hasMany(models.Participation, {
      as: 'SentRequests', // Alias for sent requests.
      foreignKey: 'FormateurId', // Foreign key in Participation table.
      onDelete: 'cascade', // Delete related participations if the formateur is deleted.
      onUpdate: 'cascade' // Update foreign key if the formateur is updated.
    });
    Formateur.hasMany(models.Participation, {
      as: 'ReceivedRequests', // Alias for received requests.
      foreignKey: 'ReceiverId', // Foreign key in Participation table.
      onDelete: 'cascade', // Delete related participations if the formateur is deleted.
      onUpdate: 'cascade' // Update foreign key if the formateur is updated.
    });
    Formateur.hasMany(models.ChatMessage, {
      foreignKey: 'sender_id', // Foreign key in ChatMessage table.
      onDelete: 'cascade', // Delete related chat messages if the formateur is deleted.
      onUpdate: 'cascade' // Update foreign key if the formateur is updated.
    });
  };

  return Formateur; // Return the defined model.
};
