const express = require('express');
const router = express.Router(); // Créer un routeur express
const nodemailer = require('nodemailer');

// Configuration Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'admin@gmail.com',
    pass: 'aaaaaaaaaaaaaaa123644',
  }
});

// Route pour envoyer l'e-mail
router.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log("Nom :", name);
  console.log("Email :", email);
  console.log("Sujet :", subject);
  console.log("Message :", message);

  const mailOptions = {
    from: email,
    to: 'admin@gmail.com',
    subject: subject,
    text: `Nom: ${name}\nEmail: ${email}\n\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Erreur lors de l\'envoi de l\'e-mail');
    } else {
      console.log('E-mail envoyé: ' + info.response);
      res.status(200).send('E-mail envoyé avec succès');
    }
  });
});

module.exports = router;
