const { ChatMessage } = require('../models');

// Contrôleur pour créer un nouveau message
exports.createMessage = async (req, res) => {
    try {
      const { message, sender_id, recipient_id, formateur_id } = req.body; // Ajouter formateur_id
      const newMessage = await ChatMessage.create({ message, sender_id, recipient_id, formateur_id });
      
      // Ici, vous pouvez également utiliser le gestionnaire de sockets pour diffuser le nouveau message
      
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Erreur lors de la création du message :', error);
      res.status(500).json({ error: 'Erreur lors de la création du message' });
    }
  };
  
  // Contrôleur pour récupérer tous les messages de chat
exports.getAllMessages = async (req, res) => {
    try {
      // Récupérer l'ID du formateur depuis la requête
      const formateurId = req.query.formateurId;

      // Récupérer tous les messages de chat du formateur depuis la base de données
      const messages = await ChatMessage.findAll({ where: { sender_id: formateurId } });

      res.status(200).json(messages);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
    }
};

  