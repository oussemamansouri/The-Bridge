const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('./models');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'assets')));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Routes
const formateurRouter = require('./routers/formateur_router');
const loginRouter = require('./routers/login_router');
const adminRouter = require('./routers/admin_router');
const moderateurRouter = require('./routers/moderateur_router');
const formationRouter = require('./routers/formation_router');
const packRouter = require('./routers/pack_router');
const contactRouter = require('./routers/contact_router');
const chatRouter = require('./routers/chat_router');
const demandeRouter = require('./routers/demande_router');
const participationRouter = require('./routers/participation_router');

app.use('/admin', adminRouter);
app.use('/moderateur', moderateurRouter);
app.use('/formateur', formateurRouter);
app.use('/formation', formationRouter);
app.use('/pack', packRouter);
app.use('/contact', contactRouter);
app.use('/chat', chatRouter);
app.use('/demande', demandeRouter);
app.use('/participation', participationRouter);
app.use('/', loginRouter);

app.use("/assets", express.static(path.join(__dirname, 'assets')));

// Sockets
let userList = new Map();

io.on('connection', (socket) => {
    let userName = socket.handshake.query.userName;
    addUser(userName, socket.id);

    socket.broadcast.emit('user-list', [...userList.keys()]);
    socket.emit('user-list', [...userList.keys()]);

    socket.on('message', (msg) => {
        socket.broadcast.emit('message-broadcast', {message: msg, userName: userName});
    });

    socket.on('disconnect', (reason) => {
        removeUser(userName, socket.id);
    });
});

function addUser(userName, id) {
    if (!userList.has(userName)) {
        userList.set(userName, new Set(id));
    } else {
        userList.get(userName).add(id);
    }
}

function removeUser(userName, id) {
    if (userList.has(userName)) {
        let userIds = userList.get(userName);
        userIds.delete(id);
        if (userIds.size === 0) {
            userList.delete(userName);
        }
    }
}

// Start server
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


