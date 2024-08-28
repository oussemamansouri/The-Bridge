const express = require('express');
const route = express.Router();
const db = require('../models');
const formateur_controller = require('../controllers/formateur_controller');
const path = require('path');

//////////////////////////////  Register API  ///////////////////////////////////////////////

// Route to register a new formateur (trainer)
// It handles image and CV upload, and assigns default images if not provided
route.post('/register', formateur_controller.upload, (req, res) => {
    // Set default image path
    const defaultImg = 'assets/image/default-image.jpg';
    let imgPath = defaultImg;
    if (req.files && req.files['img'] && req.files['img'][0]) { // Check if an image was uploaded
        imgPath = req.files['img'][0].path;
    }
    
    // Set default CV path
    const defaultCv = 'assets/image/default-cv-image.jpg';
    let cvPath = defaultCv;
    if (req.files && req.files['cv'] && req.files['cv'][0]) { // Check if a CV was uploaded
        cvPath = req.files['cv'][0].path;
    }

    // Call the register function from formateur_controller with the provided data
    formateur_controller.register(
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.password,
        imgPath,
        req.body.tel,
        req.body.dob,
        req.body.address,
        cvPath,
        req.body.portfolio,
        req.body.statu,
        req.body.linkedin,
        req.body.niveau,
        req.body.experience
    )
    .then(response => res.status(200).json(response)) // Send success response with status 200
    .catch(err => res.status(400).json(err)); // Send error response with status 400
});

//////////////////////////////////   Update Password API  //////////////////////////////////////////

// Route to update the password of a formateur
route.patch('/updatepassword/:id', (req, res) => {
    formateur_controller.updatepassword(
      req.body.oldPassword,
      req.body.newPassword,
      req.body.repeatPassword,
      req.params.id
    )
    .then(response => res.status(200).json(response)) // Send success response with status 200
    .catch(err => res.status(400).json(err)); // Send error response with status 400
});

//////////////////////////////////   Update Profile API  //////////////////////////////////////////

// Route to update the profile of a formateur
route.patch('/updateprofile/:id', (req, res) => {
    formateur_controller.updateprofile(
        req.body.firstname,
        req.body.lastname,
        req.body.dob,
        req.body.address,
        req.body.tel,
        req.body.portfolio,
        req.body.statu,
        req.body.linkedin,
        req.body.niveau,
        req.body.experience,
        req.params.id
    )
    .then(response => res.status(200).json(response)) // Send success response with status 200
    .catch(err => res.status(400).json(err)); // Send error response with status 400
});

// Route to update the profile image of a formateur
route.patch('/updateimage/:id', formateur_controller.uploadimg, (req, res) => {
    formateur_controller.updateimage(req.file.path, req.params.id)
    .then(response => res.status(200).json(response)) // Send success response with status 200
    .catch(err => res.status(400).json(err)); // Send error response with status 400
});

// Route to update the CV of a formateur
route.patch('/updatecv/:id', formateur_controller.uploadcv, (req, res) => {
    formateur_controller.updatecv(req.file.path, req.params.id)
    .then(response => res.status(200).json(response)) // Send success response with status 200
    .catch(err => res.status(400).json(err)); // Send error response with status 400
});

//////////////////////////////////   Delete Profile API  //////////////////////////////////////////

// Route to delete a formateur's profile
route.delete('/deleteprofile/:id', formateur_controller.DeleteProfile);

//////////////////////////////////   Get Profiles API  //////////////////////////////////////////

// Route to get all formateur profiles
route.get('/profiles', (req, res, next) => {
    db.Formateur.findAll()
    .then(response => res.status(200).json(response)) // Send success response with status 200
    .catch(err => res.status(400).json(err)); // Send error response with status 400
});

// Route to get a specific formateur profile by ID
route.get('/profile/:id', (req, res) => {
    db.Formateur.findOne({ where: { id: req.params.id } })
    .then(response => res.status(200).json(response)) // Send success response with status 200
    .catch(err => res.status(400).json(err)); // Send error response with status 400
});

//////////////////////////////////   Buy Points API  //////////////////////////////////////////

// Route to allow a formateur to buy points
route.patch('/buyPoints/:id/:points', (req, res) => {
    formateur_controller.buyPoints(req.params.id, req.params.points)
    .then(response => res.status(200).json(response)) // Send success response with status 200
    .catch(err => res.status(400).json(err)); // Send error response with status 400
});

module.exports = route;
