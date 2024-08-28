const express = require('express');
const route = express.Router();
const login_controller = require('../controllers/login_controller');

//////////////////////////////  Login API  ///////////////////////////////////////////////

// Route to handle user login
route.post('/login', (req, res) => {
    // Call the login function from the login_controller with email and password from the request body
    login_controller.login(req.body.email, req.body.password)
        .then(token => 
            res.status(200).json({ token: token }) // Send a success response with the generated token
        )
        .catch(err => 
            res.status(400).json(err) // Send an error response with status 400 if login fails
        );
});

module.exports = route;
