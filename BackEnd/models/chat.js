module.exports = (sequelize, DataTypes) => {
  // Define the ChatMessage model with its attributes and configurations.
  const ChatMessage = sequelize.define('ChatMessage', {
    message: {
      type: DataTypes.STRING, // The content of the chat message as a string.
      allowNull: false // The message cannot be null.
    },
    sender_id: {
      type: DataTypes.INTEGER, // The ID of the user sending the message.
      allowNull: false // The sender ID cannot be null.
    },
    recipient_id: {
      type: DataTypes.INTEGER, // The ID of the user receiving the message.
      allowNull: false // The recipient ID cannot be null.
    }
  });

  // Define associations for the ChatMessage model.
  ChatMessage.associate = models => {
    // Define a many-to-one relationship with the Formateur model for sender_id.
    ChatMessage.belongsTo(models.Formateur, {
      foreignKey: 'sender_id', // Foreign key in ChatMessage table.
      onDelete: 'CASCADE', // If the referenced Formateur is deleted, also delete related chat messages.
      onUpdate: 'CASCADE' // If the referenced Formateur is updated, update the foreign key accordingly.
    });

    // Define a many-to-one relationship with the Formateur model for recipient_id.
    ChatMessage.belongsTo(models.Formateur, {
      foreignKey: 'recipient_id', // Foreign key in ChatMessage table.
      onDelete: 'CASCADE', // If the referenced Formateur is deleted, also delete related chat messages.
      onUpdate: 'CASCADE' // If the referenced Formateur is updated, update the foreign key accordingly.
    });
  };

  // Return the defined ChatMessage model.
  return ChatMessage;
};
