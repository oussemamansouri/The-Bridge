module.exports = (sequelize, DataType) => {
  const Participation = sequelize.define("Participation", {
      ReceiverId: {
          type: DataType.BIGINT,
          allowNull: true
      }
  }
  , {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
  });

  Participation.associate = models => {
      Participation.belongsTo(models.Formateur, {
          as: 'Formateur',
          foreignKey: 'FormateurId',
          onDelete: "cascade",
          onUpdate: 'cascade'
      });
      Participation.belongsTo(models.Formateur, {
          as: 'Friend',
          foreignKey: 'ReceiverId',
          onDelete: "cascade",
          onUpdate: 'cascade'
      });
      Participation.belongsTo(models.Formation, {
          onDelete: "cascade",
          onUpdate: 'cascade'
      });
  };

  return Participation;
};
