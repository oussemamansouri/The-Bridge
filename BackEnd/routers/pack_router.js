const express = require('express');
const route = express.Router();
const db = require('../models');
const pack_controller = require('../controllers/pack_controller');

//////////////////////////////  Ajouter un pack  ///////////////////////////////////////////////

// Route to add a new pack
route.post('/addpack', (req, res) => {
    // Call the addpack function from the controller with the provided pack details
    pack_controller.addpack(req.body.titre, req.body.description, req.body.description1, req.body.description2, req.body.description3, req.body.prix, req.body.points)
        .then(response => res.status(200).json(response)) // Send success response if pack is added
        .catch(err => res.status(400).json(err)); // Send error response if there's an issue
});

//////////////////////////////  Mettre à jour un pack  ///////////////////////////////////////////////

// Route to update an existing pack by ID
route.patch('/updatepack/:id', (req, res) => {
    // Call the updatepack function from the controller with the updated pack details and pack ID
    pack_controller.updatepack(req.body.titre, req.body.description, req.body.description1, req.body.description2, req.body.description3, req.body.prix, req.body.points, req.params.id)
        .then(response => res.status(200).json(response)) // Send success response if pack is updated
        .catch(err => res.status(400).json(err)); // Send error response if there's an issue
});

//////////////////////////////  Supprimer un pack  ///////////////////////////////////////////////

// Route to delete a pack by ID
route.delete('/deletepack/:id', (req, res) => {
    // Call the deletepack function from the controller with the pack ID
    pack_controller.deletepack(req.params.id)
        .then(response => res.status(200).json(response)) // Send success response if pack is deleted
        .catch(err => res.status(400).json(err)); // Send error response if there's an issue
});

//////////////////////////////  Récupérer tous les packs  ///////////////////////////////////////////////

// Route to get all packs
route.get('/packs', (req, res, next) => {
    // Fetch all packs from the database
    db.Pack.findAll()
        .then(response => res.status(200).json(response)) // Send success response with the list of packs
        .catch(err => res.status(400).json(err)); // Send error response if there's an issue
});

//////////////////////////////  Récupérer un pack par son ID  ///////////////////////////////////////////////

// Route to get a specific pack by its ID
route.get('/pack/:id', (req, res) => {
    // Fetch the pack from the database using the provided ID
    db.Pack.findOne({ where: { id: req.params.id } })
        .then(response => res.status(200).json(response)) // Send success response with the pack details
        .catch(err => res.status(400).json(err)); // Send error response if there's an issue
});

module.exports = route;
