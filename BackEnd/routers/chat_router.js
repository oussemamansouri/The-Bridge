const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat_controller');

// Route pour récupérer tous les messages d'un utilisateur spécifique
router.get('/get-all-messages/:recipientId', async (req, res) => {
  const { recipientId } = req.params;
  try {
    const messages = await chatController.getAllMessages(recipientId);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route pour envoyer un message à un destinataire spécifique
router.post('/send-message', async (req, res) => {
  const { message, senderId, recipientId } = req.body;
  try {
    const savedMessage = await chatController.saveMessage(message, senderId, recipientId);
    res.status(200).json({ success: true, message: savedMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;


