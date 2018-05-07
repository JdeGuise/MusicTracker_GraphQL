const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require('graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connect to mongoose
mongoose.connect("mongodb://john:test123@ds111478.mlab.com:11478/gql-ninja");
mongoose.connection.once('open', () => {
	console.log("Connected to database");
});

//todo: 'connect to sql' implementation

app.set('view engine', 'pug');
app.use('/graphql', graphqlHTTP({
	schema: schema, //required
	graphiql: true
}));
app.get('/', function(req, res) {
	res.render('index', { title: 'ArtistQL', message: 'ArtistQL Landing Page: Navigate to localhost:4000/graphql to play with GraphiQL', link1: "http://localhost:4000/graphql"})
});
app.listen(
	4000,
	() => {console.log("Express GraphQL Server is Now Running on localhost:4000/graphql")}
);
