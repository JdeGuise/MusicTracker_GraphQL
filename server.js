const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require('graphql');
const schema = require('./schema/schema');
	// fields:
	// type Query {
	// 	artist(id: Int!): Artist
	// 	artists(description: String!): [Artist]
	// },
	// type Mutation {
	// 	updateArtistDescription(id: Int!, description: String!): Artist
	// },
	// type Artist {
	// 	id: Int,
	// 	name: String,
	// 	genres: [String],
	// 	description: String,
	// 	url: String,
	// 	instruments: [String],
	// 	associatedActs: [String],
	// 	activeYears: String
	// }




//
// var updateArtistDescription = function({id, description}) {
// 	artistsData.map(artist => {
// 		if(artist.id === id) {
// 			artist.description = description;
// 			return artist;
// 		}
// 	});
// 	return artistsData.filter(artist => artist.id === id)[0];
// };
//
// var getArtist = function(args) {
// 	var id = args.id;
// 	return artistsData.filter(artist => {
// 		return artist.id == id;
// 	})[0];
// };
//
// var getArtists = function(args) {
// 	if (args.name) {
// 		var name = args.name;
// 		return artistsData.filter(artist => artist.name == name);
// 	} else {
// 		return artistsData;
// 	}
// }
//
// // Root resolver
// var root = {
// 	artist: getArtist,
// 	artists: getArtists,
// 	updateArtistDescription: updateArtistDescription
// 	//message: () => 'Hello World!'
// };

const app = express();
app.set('view engine', 'pug');

app.use('/graphql', graphqlHTTP({
	schema //required
	// rootValue: root,
	// graphiql: true
}));
// 
// app.get('/', function(req, res) {
// 	res.render('index', { title: 'ArtistQL', message: 'ArtistQL Landing Page: Navigate to localhost:8000/graphql to play with GraphiQL', link1: "http://www.google.com"})
// });

app.listen(
	8000,
	() => console.log("Express GraphQL Server is Now Running on localhost:8000/graphql")
);
