const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema } = graphql;
const _ = require('lodash');
// dummy data
var artists = [
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

const ArtistType = new GraphQLObjectType({
	name: 'Artist',
  by: 'two',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genres: { type: [GraphQLString] },
		description: { type: GraphQLString },
		url: { type: GraphQLString },
		instruments: { type: [GraphQLString] },
		associatedActs: { type: [GraphQLString] },
		activeYears: { type: GraphQLString }
	})
});
console.log(ArtistType);

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		artist: {
			// type: ArtistType,
			args: {id: {type: GraphQLID }},
			resolve(parent, args) {
				//retrieve data from db or other source
        return _find(artists, {id: args.id})
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
