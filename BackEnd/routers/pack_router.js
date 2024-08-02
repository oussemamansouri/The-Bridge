const express = require('express');
const route = express.Router();
const db = require('../models');
const pack_controller = require('../controllers/pack_controller');

// Ajouter un pack
route.post('/addpack', (req, res) => {
    pack_controller.addpack(req.body.titre, req.body.description,req.body.description1,req.body.description2,req.body.description3, req.body.prix, req.body.points)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
});

// Mettre à jour un pack
route.patch('/updatepack/:id', (req, res) => {
    pack_controller.updatepack(req.body.titre, req.body.description,req.body.description1,req.body.description2,req.body.description3, req.body.prix, req.body.points, req.params.id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
});

// Supprimer un pack
route.delete('/deletepack/:id', (req, res) => {
    pack_controller.deletepack(req.params.id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
});

// Récupérer tous les packs
route.get('/packs', (req, res, next) => {
    db.Pack.findAll()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
});

// Récupérer un pack par son ID
route.get('/pack/:id', (req, res) => {
    db.Pack.findOne({ where: { id: req.params.id } })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
});

module.exports = route;
