const express = require('express');
const route = express.Router();
const db = require('../models');
const admin_controller = require('../controllers/admin_controller');
const path = require('path');

//////////////////////////////  Register API ///////////////////////////////////////////////

route.post('/register', admin_controller.upload, (req, res) => {
    const imgPath = 'assets/image/default-image.jpg'; // Consider moving this to a config file

    admin_controller.register(req.body.username, req.body.email, req.body.password, imgPath, req.body.tel)
        .then(response => res.status(200).json(response))
        .catch(err => {
            console.error('Error during registration:', err);
            res.status(400).json({ message: 'Registration failed', error: err });
        });
});

////////////////////////////////// Update Password API //////////////////////////////////////////

route.patch('/updatepassword/:id', (req, res) => {
    admin_controller.updatepassword(
        req.body.oldPassword,
        req.body.newPassword,
        req.body.repeatPassword,
        req.params.id
    )
        .then(response => res.status(200).json(response))
        .catch(err => {
            console.error('Error during password update:', err);
            res.status(400).json({ message: 'Password update failed', error: err });
        });
});

////////////////////////////////// Update Profile API //////////////////////////////////////////

route.patch('/updateprofile/:id', (req, res) => {
    admin_controller.updateprofile(req.body.username, req.body.email, req.body.tel, req.params.id)
        .then(response => res.status(200).json(response))
        .catch(err => {
            console.error('Error during profile update:', err);
            res.status(400).json({ message: 'Profile update failed', error: err });
        });
});

////////////////////////////////// Update Image API //////////////////////////////////////////

route.patch('/updateimage/:id', admin_controller.uploadimg, (req, res) => {
    // Ensure the file path is secure
    const filePath = path.normalize(req.file.path);
    admin_controller.updateimage(filePath, req.params.id)
        .then(response => res.status(200).json(response))
        .catch(err => {
            console.error('Error during image update:', err);
            res.status(400).json({ message: 'Image update failed', error: err });
        });
});

////////////////////////////////// Get Profile API //////////////////////////////////////////

route.get('/profile', (req, res) => {
    db.Admin.findOne()
        .then(response => res.status(200).json(response))
        .catch(err => {
            console.error('Error fetching profile:', err);
            res.status(400).json({ message: 'Failed to retrieve profile', error: err });
        });
});

module.exports = route;
