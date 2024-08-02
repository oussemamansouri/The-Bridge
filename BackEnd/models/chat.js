module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define('ChatMessage', {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  ChatMessage.associate = models => {
    ChatMessage.belongsTo(models.Formateur, {
      foreignKey: 'sender_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    ChatMessage.belongsTo(models.Formateur, {
      foreignKey: 'recipient_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return ChatMessage;
};
