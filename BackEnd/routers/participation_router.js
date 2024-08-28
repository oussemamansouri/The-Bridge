const express = require('express');
const route = express.Router();
const db = require('../models');
const participation_controller = require('../controllers/participation_controller');

//////////////////////////////  Accepter une participation  ///////////////////////////////////////////////

// Route to accept a participation request
route.post('/accepte/:FormateurId/:FormationId/:ReceiverId', (req, res) => {
    // Call the accepte function from the controller with the FormateurId, FormationId, and ReceiverId
    participation_controller.accepte(req.params.FormateurId, req.params.FormationId, req.params.ReceiverId)
        .then(response => res.status(200).json(response)) // Send success response if participation is accepted
        .catch(err => res.status(400).json(err)); // Send error response if there's an issue
});

//////////////////////////////  Supprimer une participation  ///////////////////////////////////////////////

// Route to delete a participation record
route.delete('/deleteparticipation/:FormateurId/:FormationId/:ReceiverId', participation_controller.Deleteparticipation);

//////////////////////////////  Récupérer les participations d'un formateur  ///////////////////////////////////////////////

// Route to get all participations for a specific formateur
route.get('/myParticipation/:FormateurId', async (req, res) => {
    try {
        // Fetch all participation records for the given FormateurId
        const participations = await db.Participation.findAll({
            where: { FormateurId: req.params.FormateurId },
            include: [
                {
                    model: db.Formation,
                    include: [
                        {
                            model: db.Formateur,
                            as: 'Formateur'
                        }
                    ]
                },
            ]
        });
        res.status(200).json(participations); // Send success response with the list of participations
    } catch (err) {
        res.status(400).json(err); // Send error response if there's an issue
    }
});

//////////////////////////////  Récupérer les amis acceptés d'un formateur  ///////////////////////////////////////////////

// Route to get accepted friends for a specific formateur
route.get('/acceptedFriends/:FormateurId', async (req, res) => {
    try {
        // Call the getAcceptedFriends function from the controller with the FormateurId
        const friends = await participation_controller.getAcceptedFriends(req.params.FormateurId);
        res.status(200).json(friends); // Send success response with the list of accepted friends
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response if there's an issue
    }
});

module.exports = route;
