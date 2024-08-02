const db = require('../models');



exports.getAllMessages = async (recipientId) => {
    try {
      const messages = await db.ChatMessage.findAll({ where: { recipient_id: recipientId } });
      return messages;
    } catch (error) {
      throw new Error('Unable to get all messages');
    }
  };
  
  exports.saveMessage = async (message, senderId, recipientId) => {
    try {
      const savedMessage = await db.ChatMessage.create({ message, sender_id: senderId, recipient_id: recipientId });
      return savedMessage;
    } catch (error) {
      throw new Error('Unable to save message');
    }
  };
