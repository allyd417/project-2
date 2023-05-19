const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3001; // Change this to your desired port

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
const controllersModels = require('project-2/controllers/index.js');
const userModel = require('project-2/models/userModel.js');

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
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
