const db = require('../models');

// Retrieve all messages for a specific recipient
exports.getAllMessages = async (recipientId) => {
    try {
        // Fetch all messages where recipient_id matches the given recipientId
        const messages = await db.ChatMessage.findAll({ where: { recipient_id: recipientId } });
        return messages;
    } catch (error) {
        // Throw a descriptive error if message retrieval fails
        throw new Error('Unable to get all messages');
    }
};

// Save a new chat message to the database
exports.saveMessage = async (message, senderId, recipientId) => {
    try {
        // Create a new message record with the provided details
        const savedMessage = await db.ChatMessage.create({ 
            message, 
            sender_id: senderId, 
            recipient_id: recipientId 
        });
        return savedMessage;
    } catch (error) {
        // Throw a descriptive error if message saving fails
        throw new Error('Unable to save message');
    }
};
