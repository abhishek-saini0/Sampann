const express = require('express');
const session = require('express-session');
const path = require('path');
const router = require('./routes/users');
const Users = require('./models/users');
const Otp = require('./models/registrationOtp');
const Interests = require('./models/interests');
const Education = require('./models/education');
const Addresses = require('./models/addresses');
const Bio = require('./models/bio');
const app = express();
const flash = require('express-flash');
const bodyParser = require('body-parser');
app.use(flash());
// Middleware setup
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'process.env.SESSION_KEY',
  resave: false,
  saveUninitialized: false,
  // cookie: { maxAge: 600000 } // Session expires after 10 minutes
}));

// Route handling
app.use("/", router);

// Error handling middleware for 404 errors 
// app.use((req, res, next) => {
//   const error = new Error('Not Found');
//   error.status = 404;
//   next(error);
// });

// General error handling middleware
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack); // Log the error stack trace for debugging
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {} // Show detailed error in development
  });
});

//Ensure database synchronization with error handling
// (async function syncDatabase() {
//   const models = [
//     { model: Users, name: 'Users' },
//     { model: Otp, name: 'OTP' },
//     //{ model: Interests, name: 'Interests' },
//    // { model: Education, name: 'Education' },

//     //{ model: Addresses, name: 'Addresses' },
//     //{ model: Bio, name: 'Bio' }
//   ];

//   for (const { model, name } of models) { 
//     try {
//       await model.sync({ force: true });
//       console.log(`${name} table synchronized successfully`);
//     } catch (err) {
//       console.error(`Error syncing ${name} table:`, err);
//     }
//   }
// })();



const http = require('http');
const { Server } = require('socket.io');



const server = http.createServer(app);
const io = new Server(server);



app.get('/chat', (req, res) => {
  res.render('chat');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});





module.exports = app;
