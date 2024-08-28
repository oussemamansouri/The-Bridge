const express = require('express');
const route = express.Router();
const db = require('../models');
const formation_controller = require('../controllers/formation_controller');
const path = require('path');
const multer = require('multer');

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/image'); // Set the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    // Set the filename to include the current timestamp to avoid conflicts
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage }); // Initialize multer with the storage configuration

//////////////////////////////  Add Formation API  ///////////////////////////////////////////////

// Route to add a new formation
// Handles image upload, assigns a default image if none is provided
route.post('/addformation/:formateurId', upload.single('img'), (req, res) => {
    const defaultImg = 'assets/image/formation.png'; // Default image path
    let imgPath = defaultImg;

    // Check if an image was uploaded, if so, update the image path
    if (req.file) {
      imgPath = req.file.path;
    }

    // Call the addformation function from the formation_controller with the provided data
    formation_controller.addformation(
      req.body.titre,
      req.body.description,
      imgPath,
      req.body.modeformation,
      req.body.besoin,
      req.body.domaine,
      req.params.formateurId
    )
    .then(response => res.status(200).json(response)) // Send success response with status 200
    .catch(err => res.status(400).json(err)); // Send error response with status 400
});

//////////////////////////////  Get Formations by Formateur API  ///////////////////////////////////////////////

// Route to get all formations for a specific formateur
route.get('/formations/:FormateurId', (req, res) => {
    db.Formation.findAll({
        where: { FormateurId: req.params.FormateurId }, // Find formations by FormateurId
        include: [db.Formateur] // Include related formateur data
    })
    .then((response) => res.status(200).json(response)) // Send success response with status 200
    .catch((err) => res.status(400).json(err)); // Send error response with status 400
});

//////////////////////////////  Update Formation API  ///////////////////////////////////////////////

// Route to update the details of a specific formation
route.patch('/updateformation/:id', (req, res) => {
    formation_controller.updateformation(
      req.body.titre,
      req.body.description,
      req.body.pointsf,
      req.body.modeformation,
      req.body.besoin,
      req.body.domaine,
      req.params.id
    )
    .then(response => res.status(200).json(response)) // Send success response with status 200
    .catch(err => res.status(400).json(err)); // Send error response with status 400
});

//////////////////////////////  Update Formation Image API  ///////////////////////////////////////////////

// Route to update the image of a specific formation
route.patch('/updateimage/:id', formation_controller.uploadimg, (req, res) => {
    formation_controller.updateimage(req.file.path, req.params.id)
    .then(response => res.status(200).json(response)) // Send success response with status 200
    .catch(err => res.status(400).json(err)); // Send error response with status 400
});

//////////////////////////////  Delete Formation API  ///////////////////////////////////////////////

// Route to delete a specific formation
route.delete('/deleteformation/:id', formation_controller.Deleteformation);

//////////////////////////////  Get All Formations API  ///////////////////////////////////////////////

// Route to get all formations
route.get('/formations', (req, res, next) => {
    db.Formation.findAll({ include: [db.Formateur] }) // Include related formateur data
    .then((response) => res.status(200).json(response)) // Send success response with status 200
    .catch((err) => res.status(400).json(err)); // Send error response with status 400
});

//////////////////////////////  Get Formation by ID API  ///////////////////////////////////////////////

// Route to get a specific formation by ID
route.get('/formation/:id', (req, res) => {
    db.Formation.findOne({
        where: { id: req.params.id }, // Find formation by ID
        include: [db.Formateur] // Include related formateur data
    })
    .then((response) => res.status(200).json(response)) // Send success response with status 200
    .catch((err) => res.status(400).json(err)); // Send error response with status 400
});

module.exports = route;
