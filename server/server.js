const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require('graphql');
const schema = require('./schema/schema');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const SERVER_PORT = config.PORT || 4000;
const SERVER_ADDRESS = config.SERVER_ADDRESS;

// allow cross-origin requests
app.use(cors());

// connect to mongoose
mongoose.connect(config.MONGO_DB_ADDRESS);
mongoose.connection.once('open', () => {
	console.log("Connected to database");
});

//todo: 'connect to sql' implementation

// express view setup
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use('/graphql', graphqlHTTP({
	schema: schema, //required
	graphiql: true
}));

// root path setup
app.get('/', function(req, res) {
	res.render('index', {
			title: 'ArtistQL',
			message: 'ArtistQL Landing Page: Navigate to ' + SERVER_ADDRESS + ' to play with GraphiQL',
			mongoDbLink: SERVER_ADDRESS
	})
});

// listen for new connections to the server
app.listen(
	SERVER_PORT,
	() => {console.log("Express GraphQL Server is Now Running on " + SERVER_ADDRESS)}
);
