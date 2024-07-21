module.exports = (sequelize, DataType) => {
    const Formateur = sequelize.define("Formateur", {
      firstname: {
        type: DataType.STRING,
        allowNull: true
      },
      lastname: {
        type: DataType.STRING,
        allowNull: true
      },
      email: {
        type: DataType.STRING,
        allowNull: true
      },
      dob: {
        type: DataType.DATEONLY,
        allowNull: true
      },
      address: {
        type: DataType.TEXT,
        allowNull: true
      },
      password: {
        type: DataType.STRING,
        allowNull: true
      },
      img: {
        type: DataType.STRING,
        allowNull: true
      },
      tel: {
        type: DataType.INTEGER,
        allowNull: true
      },
      cv: {
        type: DataType.STRING,
        allowNull: true
      },
      portfolio: {
        type: DataType.STRING,
        allowNull: true
      },
      statu: {
        type: DataType.STRING,
        allowNull: true
      },
      linkedin: {
        type: DataType.STRING,
        allowNull: true
      },
      niveau: {
        type: DataType.STRING,
        allowNull: true
      },
      experience: {
        type: DataType.STRING,
        allowNull: true
      },
      role: {
        type: DataType.STRING,
        allowNull: true
      },
      points: {
        type: DataType.INTEGER,
        allowNull: true
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  
    Formateur.associate = models => {
        Formateur.hasMany(models.Participation, {
        onDelete: "cascade",
        onUpdate: 'cascade'
      })
    }
    // Dans le modèle Formateur
Formateur.associate = models => {
  Formateur.hasMany(models.ChatMessage, {
      foreignKey: 'sender_id',
      onDelete: 'cascade',
      onUpdate: 'cascade'
  });
};

  
    return Formateur
  }
  