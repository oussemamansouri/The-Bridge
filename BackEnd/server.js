const express = require('express'); // Import the express framework to create a web application.
const http = require('http'); // Import the built-in Node.js HTTP module to create an HTTP server.
const socketIo = require('socket.io'); // Import Socket.IO for real-time bidirectional event-based communication.
const bodyParser = require('body-parser'); // Import body-parser to parse incoming request bodies, useful for form submissions.
const path = require('path'); // Import path to handle and transform file paths.
const cors = require('cors'); // Import CORS middleware to allow cross-origin requests.
const db = require('./models'); // Import the Sequelize models for database operations.

const app = express(); // Initialize the Express application.
const server = http.createServer(app); // Create an HTTP server using the Express app as the request handler.
const io = socketIo(server); // Attach Socket.IO to the HTTP server for WebSocket support.

// Middleware setup
app.use(express.json()); // Use middleware to parse JSON request bodies.
app.use(express.urlencoded({ extended: true })); // Use middleware to parse URL-encoded request bodies.
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads.
app.use(bodyParser.urlencoded({ extended: true })); // Parse incoming requests with URL-encoded payloads.
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing) for all routes.
app.use(express.static(path.join(__dirname, 'assets'))); // Serve static files from the 'assets' directory.

// CORS configuration for specific origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Allow requests from Angular frontend running on port 4200.
  res.setHeader('Access-Control-Allow-Headers', '*'); // Allow all headers in CORS requests.
  next(); // Proceed to the next middleware or route handler.
});

// Importing route modules
const formateurRouter = require('./routers/formateur_router'); // Routes for 'formateur' resource.
const loginRouter = require('./routers/login_router'); // Routes for user login.
const adminRouter = require('./routers/admin_router'); // Routes for admin functionalities.
const moderateurRouter = require('./routers/moderateur_router'); // Routes for moderator functionalities.
const formationRouter = require('./routers/formation_router'); // Routes for 'formation' resource.
const packRouter = require('./routers/pack_router'); // Routes for 'pack' resource.
const contactRouter = require('./routers/contact_router'); // Routes for contact management.
const chatRouter = require('./routers/chat_router'); // Routes for chat functionalities.
const demandeRouter = require('./routers/demande_router'); // Routes for 'demande' resource.
const participationRouter = require('./routers/participation_router'); // Routes for participation management.

// Registering routes
app.use('/admin', adminRouter); // Use adminRouter for '/admin' routes.
app.use('/moderateur', moderateurRouter); // Use moderateurRouter for '/moderateur' routes.
app.use('/formateur', formateurRouter); // Use formateurRouter for '/formateur' routes.
app.use('/formation', formationRouter); // Use formationRouter for '/formation' routes.
app.use('/pack', packRouter); // Use packRouter for '/pack' routes.
app.use('/contact', contactRouter); // Use contactRouter for '/contact' routes.
app.use('/chat', chatRouter); // Use chatRouter for '/chat' routes.
app.use('/demande', demandeRouter); // Use demandeRouter for '/demande' routes.
app.use('/participation', participationRouter); // Use participationRouter for '/participation' routes.
app.use('/', loginRouter); // Use loginRouter for the root route ('/').

// Serve static assets from the 'assets' directory
app.use("/assets", express.static(path.join(__dirname, 'assets')));

// Socket.IO connection handler
let userList = new Map(); // Initialize a map to keep track of connected users.

io.on('connection', (socket) => { // Listen for new connections on Socket.IO.
    let userName = socket.handshake.query.userName; // Get the user's name from the query parameters.
    addUser(userName, socket.id); // Add the user to the user list with their socket ID.

    // Broadcast the updated user list to all connected clients.
    socket.broadcast.emit('user-list', [...userList.keys()]);
    socket.emit('user-list', [...userList.keys()]);

    // Listen for 'message' events from clients.
    socket.on('message', (msg) => {
        // Broadcast the message to all other connected clients.
        socket.broadcast.emit('message-broadcast', {message: msg, userName: userName});
    });

    // Listen for 'disconnect' events when a user disconnects.
    socket.on('disconnect', (reason) => {
        removeUser(userName, socket.id); // Remove the user from the user list.
    });
});

// Function to add a user to the user list
function addUser(userName, id) {
    if (!userList.has(userName)) { // If the user is not already in the list
        userList.set(userName, new Set(id)); // Add the user with their socket ID.
    } else {
        userList.get(userName).add(id); // If the user exists, add the new socket ID to their set.
    }
}

// Function to remove a user from the user list
function removeUser(userName, id) {
    if (userList.has(userName)) { // Check if the user exists in the list
        let userIds = userList.get(userName); // Get the set of socket IDs associated with the user.
        userIds.delete(id); // Remove the specific socket ID.
        if (userIds.size === 0) { // If no more socket IDs are associated with the user
            userList.delete(userName); // Remove the user from the list.
        }
    }
}

// Start the server
const PORT = process.env.PORT || 3000; // Use the environment's port or default to 3000.
db.sequelize.sync().then(() => { // Sync database models and then start the server.
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start listening on the specified port.
});
