const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Importer jwt
const { ChatMessage } = require('../models');
const chat_Controller = require('../controllers/chat_controller');

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Accès non autorisé. Token manquant.' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Accès non autorisé. Token invalide.' });
    req.user = decoded;
    next();
  });
};

// Créer un nouveau message
router.post('/createmessages', verifyToken, chat_Controller.createMessage);

// Récupérer tous les messages de chat
router.get('/messages', verifyToken, chat_Controller.getAllMessages);

module.exports = router;
