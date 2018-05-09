# MusicTracker_GraphQL
A miniature full stack app for adding and retrieving song and album information by artist.

## Current access points

### Server (defaults)
* Root: localhost:4000
* igraphql: localhost:4000/graphql

### Client
* client/app: localhost:3000

## Startup

##### Open two terminals. Navigate to the node.js Express app root directory.
#### Server

    node server.js

##### Next, navigate to the React app root directory.
#### Client
    npm start


### Setup Database - mongodb
1. Create a free account on mlab.com and log in.
2. Create a database, give it a name.
3. Create a user with a password on mlab.
4. Store the database credentials in config.js (check out config.js for the required info).
5. Run the server and verify that no runtime errors occur.
