const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLSchema,
	GraphQLList,
	GraphQLInt
} = graphql;
const _ = require('lodash');

// dummy data
const artists = [
	{
		id: '1',
		name: "Tomas Kalnoky",
		genres: ["ska punk", "third wave ska", "punk rock", "world", "folk"],
		description: "Lead singer and guitarest for Streetlight Manifesto; Solo artist; Lead singer for Bands of the Acoustic Revolution",
		url: "https://streetlightmanifesto.com",
		instruments: ["guitar", "ukulele", "drums", "vocals"],
		associatedActs: ["Streetlight Manifesto", "Bandits of the Acoustic Revolution", "Tomas Kalnoky"],
		activeYears: "1995 - Present"
	},
	{
		id: '2',
		name: "Jimi Hendrix",
		genres: ["psychedelic rock", "rock", "hard rock", "blues", "R&B"],
		description: "Lead singer and guitarest for The Jimi Hendrix Experience",
		url: "https://jimihendrix.com/jimi/",
		instruments: ["guitar", "vocals"],
		associatedActs: ["The Jimi Hendrix Experience", "Jimi Hendrix", "Band of Gypsies"],
		activeYears: "1963 - 1970"
	},
	{
		id: '3',
		name: "Janis Joplin",
		genres: ["psychedelic blues", "blues", "soul"],
		description: "Lead singer for Big Brother and the Holding Company; Solo artist",
		url: "https://janisjoplin.com/",
		instruments: ["vocals"],
		associatedActs: ["Big Brother and the Holding Company", "Janis Joplin", "Kosmic Blues"],
		activeYears: "1962 - 1970"
	}
];

const albums = [
	{
		id: '1',
		name: "Somewhere in the Between",
		releaseYear: 2007,
		artistId: '1'
	},
	{
		id: '2',
		name: "Axis: Bold as Love",
		releaseYear: 1967,
		artistId: '2'
	},
	{
		id: '3',
		name: "Big Brother and the Holding Company",
		releaseYear: 1967,
		artistId: '3'
	},
	{
		id: '4',
		name: "The Hands that Thieve",
		releaseYear: 2013,
		artistId: '1'
	}
]

const AlbumType = new GraphQLObjectType({
    name: 'Album',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
				releaseYear: { type: GraphQLInt },
				artist: {
					type: ArtistType,
					resolve(parent, args) {
						return _.find(artists, { id: parent.artistId });
					}
				},
    })
});

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genres: { type: new GraphQLList(GraphQLString) },
				description: { type: GraphQLString },
				url: { type: GraphQLString },
				instruments: { type: new GraphQLList(GraphQLString) },
				associatedActs: { type: new GraphQLList(GraphQLString) },
				activeYears: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        artist: {
            type: ArtistType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                return _.find(artists, { id: args.id });
            }
        },
				album: {
						type: AlbumType,
						args: { id: { type: GraphQLID } },
						resolve(parent, args) {
							return _.find(albums, { id: args.id });
						}
				}
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
