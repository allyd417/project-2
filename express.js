const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');

const sequelize = require('./Database/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001; // Change this to your desired port

const hbs = exphbs.create({});

const sess = {
	secret: 'Super secret secret',
	cookie: {
		maxAge: 1000 * 60 * 60 * 2,
		httpOnly: true,
		secure: false,
		sameSite: 'strict',
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

// Set up Handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// import all your routes from controllers/index.js
app.use(routes);

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
