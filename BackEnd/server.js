
const express = require('express');
const http = require('http');
const db = require('./models');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Request-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

// Routes
const formateur_router = require(path.join(__dirname, 'routers', 'formateur_router'));
const login_router = require(path.join(__dirname, 'routers', 'login_router'));
const admin_router = require(path.join(__dirname, 'routers', 'admin_router'));
const moderateur_router = require(path.join(__dirname, 'routers', 'moderateur_router'));
const formation_router = require(path.join(__dirname, 'routers', 'formation_router'));
const pack_router = require(path.join(__dirname, 'routers', 'pack_router'));
const contact_router = require(path.join(__dirname, 'routers', 'contact_router'));
const chat_router = require(path.join(__dirname, 'routers', 'chat_router'));
const demande_router = require(path.join(__dirname, 'routers', 'demande_router'));
const participation_router = require(path.join(__dirname, 'routers', 'participation_router'));

app.use('/admin', admin_router);
app.use('/moderateur', moderateur_router);
app.use('/formateur', formateur_router);
app.use('/formation', formation_router);
app.use('/pack', pack_router);
app.use('/contact', contact_router);
app.use('/chat', chat_router);
app.use('/demande', demande_router);
app.use('/participation', participation_router);
app.use('/', login_router);

app.use("/assets", express.static(path.join(__dirname, 'assets')));

// Start server
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

db.sequelize.sync().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});



