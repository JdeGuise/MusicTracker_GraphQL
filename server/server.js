const express = require("express");
const graphqlHTTP = require("express-graphql");
const fileUpload = require('express-fileupload');
const graphql = require('graphql');
const schema = require('./schema/schema');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const template = require('./template.js');
const upload = require('./upload.js');
const app = express();

const SERVER_PORT = config.PORT || 4000;
const SERVER_ADDRESS = config.SERVER_ADDRESS;

// allow cross-origin requests
app.use(cors());

// allow csv file upload
app.use(fileUpload());

// connect to mongoose
mongoose.connect(config.MONGO_DB_ADDRESS);
mongoose.connection.once('open', () => {
	console.log("Connected to database");
});

// todo: 'connect to sql' implementation

// express view setup
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use('/graphql', graphqlHTTP({
	schema: schema, //required
	graphiql: true
}));

// root path setup - csv uploader
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/template', template.get);
app.post('/', upload.post);

// listen for new connections to the server
app.listen(
	SERVER_PORT,
	() => {console.log("Express GraphQL Server is Now Running on " + SERVER_ADDRESS)}
);
