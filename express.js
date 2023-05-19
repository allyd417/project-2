const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001; // Change this to your desired port

// Set up Handlebars as the template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set up static file serving
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Add more routes and connect to controllers and models as needed
const controllersModels = require('./controllers/index.js');
const userModel = require('./models/user.js');


app.get('/users', async (req, res) => {
  try {
    const users = await userModel.getAllUsers(); // Assuming you have a function in the model to retrieve all users
    res.render('users', { users }); // Assuming you have a "users.handlebars" file in the views directory
  } catch (error) {
    // Handle any errors
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
