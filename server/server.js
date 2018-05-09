const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require('graphql');
const schema = require('./schema/schema');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const SERVER_PORT = process.env.PORT || 4000;
const SERVER_ADDRESS = "http://localhost:"+ SERVER_PORT + "/graphql";

// allow cross-origin requests
app.use(cors());

// connect to mongoose
mongoose.connect(config.MONGO_DB_ADDRESS);
mongoose.connection.once('open', () => {
	console.log("Connected to database");
});

//todo: 'connect to sql' implementation

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use('/graphql', graphqlHTTP({
	schema: schema, //required
	graphiql: true
}));

app.get('/', function(req, res) {
	res.render('index', {
			title: 'ArtistQL',
			message: 'ArtistQL Landing Page: Navigate to ' + SERVER_ADDRESS + ' to play with GraphiQL',
			link1: SERVER_ADDRESS
	})
});

app.listen(
	4000,
	() => {console.log("Express GraphQL Server is Now Running on " + SERVER_ADDRESS)}
);
