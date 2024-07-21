// In your Demande model
module.exports = (sequelize, DataType) => {
  const Demande = sequelize.define("Demande", {
    ReceiverId:{
      type:DataType.BIGINT,
      allowNull:true
  }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  });

  Demande.associate = models => {
    Demande.belongsTo(models.Formateur, {
      onDelete: "cascade",
      onUpdate: 'cascade'
    });
    Demande.belongsTo(models.Formation, {
      onDelete: "cascade",
      onUpdate: 'cascade'
    });
  };

  return Demande;
};
