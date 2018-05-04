const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString } = graphql;

const ArtistType = new GraphQLObjectType({
	name: 'Artist',
	fields: () => ({
		id: { type: GraphQLString }
	})
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
});

// var schema2 = buildSchema(`

// `);

var artistsData = [
	{
		id: 1,
		name: "Tomas Kalnoky",
		genres: ["ska punk", "third wave ska", "punk rock", "world", "folk"],
		description: "Lead singer and guitarest for Streetlight Manifesto; Solo artist; Lead singer for Bands of the Acoustic Revolution",
		url: "https://streetlightmanifesto.com",
		instrument: ["guitar", "ukulele", "drums", "vocals"],
		associatedActs: ["Streetlight Manifesto", "Bandits of the Acoustic Revolution", "Tomas Kalnoky"],
		activeYears: "1995 - Present"
	},
	{
		id: 2,
		name: "Jimi Hendrix",
		genres: ["psychedelic rock", "rock", "hard rock", "blues", "R&B"],
		description: "Lead singer and guitarest for The Jimi Hendrix Experience",
		url: "https://jimihendrix.com/jimi/",
		instrument: ["guitar", "vocals"],
		associatedActs: ["The Jimi Hendrix Experience", "Jimi Hendrix", "Band of Gypsies"],
		activeYears: "1963 - 1970"
	},
	{
		id: 3,
		name: "Janis Joplin",
		genres: ["psychedelic blues", "blues", "soul"],
		description: "Lead singer for Big Brother and the Holding Company; Solo artist",
		url: "https://janisjoplin.com/",
		instrument: ["vocals"],
		associatedActs: ["Big Brother and the Holding Company", "Janis Joplin", "Kosmic Blues"],
		activeYears: "1962 - 1970"
	}
];

var updateArtistDescription = function({id, description}) {
	artistsData.map(artist => {
		if(artist.id === id) {
			artist.description = description;
			return artist;
		}
	});
	return artistsData.filter(artist => artist.id === id)[0];
};

var getArtist = function(args) {
	var id = args.id;
	return artistsData.filter(artist => {
		return artist.id == id;
	})[0];
};

var getArtists = function(args) {
	if (args.name) {
		var name = args.name;
		return artistsData.filter(artist => artist.name == name);
	} else {
		return artistsData;
	}
}

// Root resolver
var root = {
	artist: getArtist,
	artists: getArtists,
	updateArtistDescription: updateArtistDescription
	//message: () => 'Hello World!'
};

const app = express();
app.use('/graphql', graphqlHTTP({
	schema: ArtistType, //required
	rootValue: root,
	graphiql: true
}));

app.listen(
	8000,
	() => console.log("Express GraphQL Server is Now Running on localhost:8000/graphql")
);