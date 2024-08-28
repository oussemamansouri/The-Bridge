module.exports = (sequelize, DataTypes) => {
  // Define the ChatMessage model with its attributes.
  const ChatMessage = sequelize.define('ChatMessage', {
    message: {
      type: DataTypes.STRING, // Content of the chat message.
      allowNull: false // Message cannot be null.
    },
    sender_id: {
      type: DataTypes.INTEGER, // ID of the message sender.
      allowNull: false // Sender ID cannot be null.
    },
    recipient_id: {
      type: DataTypes.INTEGER, // ID of the message recipient.
      allowNull: false // Recipient ID cannot be null.
    }
  });

  // Define associations for the ChatMessage model.
  ChatMessage.associate = models => {
    ChatMessage.belongsTo(models.Formateur, {
      foreignKey: 'sender_id', // Foreign key in ChatMessage table.
      onDelete: 'CASCADE', // Delete related messages if the sender is deleted.
      onUpdate: 'CASCADE' // Update foreign key if the sender is updated.
    });

    ChatMessage.belongsTo(models.Formateur, {
      foreignKey: 'recipient_id', // Foreign key in ChatMessage table.
      onDelete: 'CASCADE', // Delete related messages if the recipient is deleted.
      onUpdate: 'CASCADE' // Update foreign key if the recipient is updated.
    });
  };

  return ChatMessage; // Return the defined model.
};
