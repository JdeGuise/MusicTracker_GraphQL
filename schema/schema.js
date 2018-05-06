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

const albums = [
	{
		id: '1',
		name: "Somewhere in the Between",
		releaseYear: 2007,
		artistId: '5'
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
		artistId: '5'
	},
	{
		id: '5',
		name: "Everything Goes Numb",
		releaseYear: 2003,
		artistId: '5'
	},
	{
		id: '6',
		name: "99 Songs of Revolution",
		releaseYear: 2010,
		artistId: '5'
	},
	{
		id: '7',
		name: "The Hand that Thieves",
		releaseYear: 2013,
		artistId: '1'
	},
	{
		id: '8',
		name: "Keasbey Nights",
		releaseYear: 2006,
		artistId: '5'
	}
];

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
		description: "James Marshall 'Jimi' Hendrix (born Johnny Allen Hendrix; November 27, 1942 – September 18, 1970) was an American rock guitarist, singer, and songwriter. Although his mainstream career spanned only four years, he is widely regarded as one of the most influential electric guitarists in the history of popular music, and one of the most celebrated musicians of the 20th century. The Rock and Roll Hall of Fame describes him as 'arguably the greatest instrumentalist in the history of rock music.'",
		url: "https://jimihendrix.com/jimi/",
		instruments: ["guitar", "vocals"],
		associatedActs: ["The Jimi Hendrix Experience", "Jimi Hendrix", "Band of Gypsies"],
		activeYears: "1963 - 1970"
	},
	{
		id: '3',
		name: "Janis Joplin",
		genres: ["psychedelic blues", "blues", "soul"],
		description: "Janis Lyn Joplin was an American rock singer and songwriter; one of the most successful and widely-known female rock stars of her era. After releasing three albums, she died of a heroin overdose at the age of 27. A fourth album, Pearl, was released in January 1971, just over three months after her death. It reached number one on the Billboard charts.",
		url: "https://janisjoplin.com/",
		instruments: ["vocals"],
		associatedActs: ["Big Brother and the Holding Company", "Janis Joplin", "Kosmic Blues"],
		activeYears: "1962 - 1970"
	},
	{
		id: '4',
		name: "Lake Street Dive",
		genres: ["southern rock", "indie pop", "blue-eyed soul", "jazz", "folk rock", "motown"],
		description: "Lake Street Dive is a multigenre band that was founded in 2004 in Boston, Massachusetts. The band consists of Rachael Price (lead vocals), Mike \"McDuck\" Olson (trumpet, guitar), Bridget Kearney (upright bass), Akie Bermiss (keyboards), and Mike Calabrese (drums). They met while attending the New England Conservatory of Music in Boston. The band was named after a street with many dive bars in Olson's hometown of Minneapolis, Minnesota. The band tours in North America, Australia, and Europe from their base in Brooklyn.",
		url: "https://www.lakestreetdive.com",
		instruments: ["vocals", "trumpet", "guitar", "upright bass", "keyboards", "drums"],
		associatedActs: [],
		activeYears: "2004 - Present"
	},
	{
		id: '5',
		name: "Streetlight Manifesto",
		genres: ["ska punk", "punk rock", "third-wave ska"],
		description: "Streetlight Manifesto is an American ska punk band from New Brunswick, New Jersey formed in 2002. They released their first album, Everything Goes Numb, which was distributed by Victory Records, on August 26, 2003. The band headlined and sold out their first concert at Rutgers University in New Brunswick, New Jersey on December 9, 2003. Several of Streetlight Manifesto's members were well known in the New Jersey third wave ska community for their roles in past ska punk bands from that area, primarily Kalnoky's Catch 22 and fellow New Jersey band One Cool Guy.",
		url: "https://www.streetlightmanifesto.com",
		instruments: ["vocals", "guitar", "bass guitar", "drums", "trumpet", "trombone", "alto saxophone", "tenor saxophone", "baritone saxophone"],
		associatedActs: ["Tomas Kalnoky", "Bands of the Acoustic Revolution"],
		activeYears: "2002 - Present"
	}
];

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
				albums: {
					type: new GraphQLList(AlbumType),
					resolve(parent, args) {
						return _.filter(albums, { artistId: parent.id })
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
				},
				albums: {
						type: new GraphQLList(AlbumType),
						resolve(parent, args) {
							return albums;
						}
				},
				artists: {
						type: new GraphQLList(ArtistType),
						resolve(parent, args) {
							return artists;
						}
				}
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
