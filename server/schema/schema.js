const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require('graphql');
const _ = require('lodash');
const Album = require('../models/album');
const Artist = require('../models/artist');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLSchema,
	GraphQLList,
	GraphQLInt,
	GraphQLNonNull
} = graphql;

const AlbumType = new GraphQLObjectType({
	name: 'Album',
	fields: ( ) => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		releaseYear: { type: GraphQLInt },
		artist: {
			type: ArtistType,
			resolve(parent, args) {
				return Artist.findById(parent.artistId);
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
		albums: {
			type: new GraphQLList(AlbumType),
			resolve(parent, args) {
				return Album.find({ artistId: parent.id });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		artist: {
			type: ArtistType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args){
				return Artist.findById(args.id);
			}
		},
		album: {
			type: AlbumType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Album.findById(args.id);
			}
		},
		albums: {
			type: new GraphQLList(AlbumType),
			resolve(parent, args) {
				return Album.find({});
			}
		},
		artists: {
			type: new GraphQLList(ArtistType),
			resolve(parent, args) {
				return Artist.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addArtist: {
			type: ArtistType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genres: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
				url: { type: new GraphQLNonNull(GraphQLString) },
				instruments: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
				associatedActs: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
				activeYears: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let artist = new Artist({
					name: args.name,
					genres: args.genres,
					url: args.url,
					instruments: args.instruments,
					associatedActs: args.associatedActs,
					activeYears: args.activeYears,
				});
				return artist.save();
			}
		},
		addAlbum: {
			type: AlbumType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				releaseYear: { type: new GraphQLNonNull(GraphQLInt) },
				artistId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let album = new Album({
					name: args.name,
					releaseYear: args.releaseYear,
					artistId: args.artistId
				});
				return album.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
