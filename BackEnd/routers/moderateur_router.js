const express = require('express');
const route = express.Router();
const db = require('../models');
const moderateur_controller = require('../controllers/moderateur_controller');
const path = require('path');

//////////////////////////////  Register API  ///////////////////////////////////////////////

// Route to handle moderator registration
route.post('/register', moderateur_controller.upload, (req, res) => {

    const defaultImg = 'assets/image/default-image.jpg';
    let imgPath = defaultImg;
    
    // Check if an image was uploaded and set the image path accordingly
    if (req.files && req.files['img'] && req.files['img'][0]) {
        imgPath = req.files['img'][0].path;
    }

    // Call the register function from the controller with the form data and image path
    moderateur_controller.register(req.body.firstname, req.body.lastname, req.body.username, req.body.email, req.body.password, imgPath, req.body.tel)
        .then(response => res.status(200).json(response)) // Send success response
        .catch(err => res.status(400).json(err)); // Send error response
});

//////////////////////////////  Delete Profile API  ///////////////////////////////////////////////

// Route to handle the deletion of a moderator's profile
route.delete('/deleteprofile/:id', moderateur_controller.DeleteProfile);

//////////////////////////////  Get All Profiles API  ///////////////////////////////////////////////

// Route to get all moderator profiles
route.get('/profiles', (req, res, next) => {
    db.Moderateur.findAll()
        .then(response => res.status(200).json(response)) // Send success response with all profiles
        .catch(err => res.status(400).json(err)); // Send error response
});

//////////////////////////////  Get Profile by ID API  ///////////////////////////////////////////////

// Route to get a specific moderator's profile by ID
route.get('/profile/:id', (req, res, next) => {
    db.Moderateur.findOne({ where: { id: req.params.id } })
        .then(response => res.status(200).json(response)) // Send success response with the profile data
        .catch(err => res.status(400).json(err)); // Send error response
});

//////////////////////////////  Update Profile API  ///////////////////////////////////////////////

// Route to update a moderator's profile
route.patch('/updateprofile/:id', (req, res) => {
    moderateur_controller.updateprofile(req.body.firstname, req.body.lastname, req.body.username, req.body.email, req.body.tel, req.params.id)
        .then(response => res.status(200).json(response)) // Send success response after profile update
        .catch(err => res.status(400).json(err)); // Send error response
});

//////////////////////////////  Update Password API  ///////////////////////////////////////////////

// Route to update a moderator's password
route.patch('/updatepassword/:id', (req, res) => {
    moderateur_controller.updatepassword(
        req.body.oldPassword,
        req.body.newPassword,
        req.body.repeatPassword,
        req.params.id
    )
        .then(response => res.status(200).json(response)) // Send success response after password update
        .catch(err => res.status(400).json(err)); // Send error response
});

//////////////////////////////  Update Image API  ///////////////////////////////////////////////

// Route to update a moderator's profile image
route.patch('/updateimage/:id', moderateur_controller.uploadimg, (req, res) => {
    moderateur_controller.updateimage(req.file.path, req.params.id)
        .then(response => res.status(200).json(response)) // Send success response after image update
        .catch(err => res.status(400).json(err)); // Send error response
});

module.exports = route;
