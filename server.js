var express = require("express");
var express_graphql = require("express-graphql");
var {buildSchema} = require('graphql');

var schema = buildSchema(`
	type Query {
		musician(id: Int!): Musician 
		musicians(name: String): [Musician]
	},
	type Musician {
		id: Int,
		name: String,
		genres: [String],
		description: String,
		url: String,
		instruments: [String],
		associatedActs: [String]
	}
`);

var musiciansData = [
	{
		id: 1,
		name: "Tomas Kalnoky",
		genres: ["ska punk", "third wave ska", "punk rock", "world", "folk"],
		description: "Lead singer and guitarest for Streetlight Manifesto; Solo artist; Lead singer for Bands of the Acoustic Revolution",
		url: "https://streetlightmanifesto.com",
		instrument: ["guitar", "ukulele", "drums", "vocals"],
		associatedActs: ["Streetlight Manifesto", "Bandits of the Acoustic Revolution", "Tomas Kalnoky"]
	},
	{
		id: 2,
		name: "Jimi Hendrix",
		genres: ["psychedelic rock", "rock", "hard rock", "blues", "R&B"],
		description: "Lead singer and guitarest for The Jimi Hendrix Experience",
		url: "https://jimihendrix.com/jimi/",
		instrument: ["guitar", "vocals"],
		associatedActs: ["The Jimi Hendrix Experience", "Jimi Hendrix", "Band of Gypsies"]
	},
	{
		id: 3,
		name: "Janis Joplin",
		genres: ["psychedelic blues", "blues", "soul"],
		description: "Lead singer for Big Brother and the Holding Company; Solo artist",
		url: "https://janisjoplin.com/",
		instrument: ["vocals"],
		associatedActs: ["Big Brother and the Holding Company", "Janis Joplin", "Kosmic Blues"]
	}
];



var getMusician = function(args) {
	var id = args.id;
	return musiciansData.filter(musician => {
		return musician.id == id;
	})[0];
};

var getMusicians = function(args) {
	if (args.name) {
		var name = args.name;
		return musiciansData.filter(musician => musician.name == name);
	} else {
		return musiciansData;
	}
}

// Root resolver
var root = {
	musician: getMusician,
	musicians: getMusicians
	//message: () => 'Hello World!'
};

var app = express();
app.use('/graphql', express_graphql({
	schema: schema,
	rootValue: root,
	graphiql: true
}));

app.listen(
	8000,
	() => console.log("Express GraphQL Server is Now Running on localhost:8000/graphql")
);