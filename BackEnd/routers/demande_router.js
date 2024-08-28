const express = require('express');
const route = express.Router();
const db = require('../models');
const demande_controller = require('../controllers/demande_controller');

// Route to send a new request/demande
// It takes FormateurId, FormationId, and ReceiverId as parameters from the URL
route.post('/envoyer/:FormateurId/:FormationId/:ReceiverId', async (req, res) => {
    try {
        // Call the envDemande function from demande_controller to handle the request
        const response = await demande_controller.envDemande(req.params.FormateurId, req.params.FormationId, req.params.ReceiverId);
        // If successful, send the response with a 200 status
        res.status(200).json(response);
    } catch (err) {
        // If there is an error, send the error message with a 400 status
        res.status(400).json(err);
    }
});

// Route to delete a request/demande
// It deletes a specific demande based on FormateurId, FormationId, and ReceiverId
route.delete('/delete/:FormateurId/:FormationId/:ReceiverId', demande_controller.Deletedemande);

// Route to get all demandes sent by a specific Formateur
// It retrieves all demandes associated with the given FormateurId, including related Formation and Formateur details
route.get('/myDemandes/:FormateurId', (req, res) => {
    db.Demande.findAll({
        where: { FormateurId: req.params.FormateurId },
        include: [
            {
                model: db.Formation,
                include: [
                    {
                        model: db.Formateur,
                        as: 'Formateur' // Alias to include the related Formateur data
                    }
                ]
            }
        ]
    })
    .then((response) => res.status(200).json(response)) // Send the found demandes with a 200 status
    .catch((err) => res.status(400).json(err)); // Handle any errors with a 400 status
});

// Route to get all demandes received by a specific Receiver
// It retrieves all demandes where the ReceiverId matches, including related Formation and Formateur details
route.get('/RequestsReceive/:ReceiverId', (req, res) => {
    db.Demande.findAll({
        where: { ReceiverId: req.params.ReceiverId },
        include: [db.Formation, db.Formateur] // Include related Formation and Formateur models
    })
    .then((response) => res.status(200).json(response)) // Send the found demandes with a 200 status
    .catch((err) => res.status(400).json(err)); // Handle any errors with a 400 status
});

// Export the router to be used in other parts of the application
module.exports = route;
