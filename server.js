const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require('graphql');
const schema = require('./schema/schema');
const app = express();

app.set('view engine', 'pug');
app.use('/graphql', graphqlHTTP({
	schema: schema, //required
	graphiql: true
}));
app.get('/', function(req, res) {
	res.render('index', { title: 'ArtistQL', message: 'ArtistQL Landing Page: Navigate to localhost:8000/graphql to play with GraphiQL', link1: "http://localhost:8000/graphql"})
});
app.listen(
	8000,
	() => {console.log("Express GraphQL Server is Now Running on localhost:8000/graphql")}
);
