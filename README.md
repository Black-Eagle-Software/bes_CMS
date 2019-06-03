# Black Eagle Software presents: a Content Management System

## Summary
The Black Eagle Software Content Management System (BES CMS) is an attempt to solve a simple problem; how to store pictures and videos (media) in a way that's not limited by a simple folder scheme, while allowing for:

1. Tagging media as much or as little as desired
2. Allowing for creating albums that contain media
3. Allow for media in multiple albums
4. Easily finding media via search
5. Have a way to deal with duplicate media (ideally by not allowing duplicates in the system)

Folders, and especially nested folders, work fine most of the time for media storage.  Problems start to arise when a folder scheme tries to also categorize or organize the media such that you end up with a folder structure like:
```
Root
+Date
| + Person
| + Event
+ Date 2
  + Event
```
That sort of folder scheme starts to breakdown when, for instance, you have multiple people in a single picture.  Which person's folder do you put it under? Or do you create a `Groups` folder to catch those media that aren't of a single person?

### What BES CMS Does Different
BES CMS is basically a React front-end to a Node.js server that can connect to a SQL database.  Media is uploaded to the server from the front-end, and the server stores the media and adds references in the database.  The front-end allows for adding tags to media.  Tags can be a person's name, or an object, or an event, for instance.  Mappings between tags and media are stored in the databse.

## Installation
### Getting the Server Running
Setting up the server requires performing the following steps:
1. Install dependencies on the server
2. Setup database users and tables
3. Clone repository and .env file entries
4. Install node dependencies via npm
5. Start server

### Server Dependencies
The following dependencies will need to be installed and setup on the intended server:
```
Dependency      Comments
git             Latest version
node.js         Version 11.6.0+
SQL server      MariaDB 10.1 on Debian 9 is our development environment, MySQL 5.5+ should work
GraphicsMagick  Latest version, used for making thumbnails and perceptual image hashes
```

### Database Setup
In the `src/dbase` folder is a database template file [dev.sql](src/dbase/dev.sql "dev.sql").  Importing this file into a running MySQL/MariaDB/etc. SQL database will generate the necessary tables for use with BES CMS.  We suggest importing this template into a database called `besCMS` and entering that name in the `.env` file (detailed in the next section) in the `DBASE_DATABASE_PROD` entry.  If you are going to be doing development, this same template can also be imported as a separate database to create a development database, such as `besCMS_dev`.  

Ensure that a user is created for interacting with the SQL database and that they have access rights to read, write, create, and delete data from the production database.  We suggest creating a separate user for interacting with a development database that only has read access to the production database.  Both of these users (and their passwords) will need to be entered into the appropriate fields in the `.env` file, as detailed in the next section.

### Clone Repository and .env File Entries
#### Clone Repository
Run the following command in the folder you wish to clone the repository into:
```
git clone [address]/BES_CMS.redux.git
```

#### .env File
Create a .env file in the root project folder.  The .env file will need the following entries in order for the Node.js server to function:
```javascript
IS_PRODUCTION=true

//Database connection details
DBASE_HOST_PROD='some value'        //IP address of the database host system
DBASE_USER_PROD='some value'        //User to use when interacting with the database
DBASE_PASSWORD_PROD='some value'    //Password of the database user
DBASE_DATABASE_PROD='some value'    //Name of the database (such as besCMS)

//Session variables used for keeping track of logged in users
SESSION_SECRET='some value'         //Used by Express Passport to secure session data 
```

BES CMS supports having a separate development and production database.  Set `IS_PRODUCTION=false` and add the following entries for use with the development database:
```javascript
//Development database connection details
DBASE_HOST_DEV='some value'
DBASE_USER_DEV='some value'
DBASE_PASSWORD_DEV='some value'
DBASE_DATABASE_DEV='some value'
```
##### Developing Over a Network Share
For some systems doing development on a network share, the Node.js webpack may not pick up when files are changed.  Similarly, nodemon may not reload the server after files change.  One possible work around for this is to add the following entry to the .env file:
```javascript
//fix for development folder living on a network share
CHOKIDAR_USEPOLLING=true
```

### Node.js  Server Setup
From the root BES CMS folder, run the following command to install all the required npm dependencies:
```javascript
npm install
```
After all dependencies have been installed successfully, and the database has been setup, start the server via:
```javascript
npm start
```
This will give an output similar to the following:
```
> bes_cms-api@ start /home/gary/besCMS
> nodemon server.js

[nodemon] 1.18.6
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server.js`
Server now running on port: 8080
```
Now the server should be accessible via `http:\\SERVER_ADDRESS:8080`.  If a port other than 8080 needs to be used, that can be changed via the `src/server.js` `port` variable:
```javascript
var port = env.PORT || 8080;    //set our port
```

## Development
The following resources are available for use when doing development work on BES CMS.
* [Coding Style](CODING-STYLE.MD "CODING-STYLE.MD")
* [Node.js Server API End Points](API.md "API.md")
* [Development Roadmap](DEV-ROADMAP.md "DEV-ROADMAP.md")

## What's Included in the Box (and What's Not)
The following features are currently implemented (this is not an exhaustive list):
* User accounts
  * New user accounts can be made via the `Register` button in the main page's header toolbar.
  * There is a default Admin account accessible via the following information (you will be prompted to change the password on first login):
  ```
    email: admin@localhost
    default password: BlackEagleSoftware
  ```    
  * *The Admin account doesn't actually do anything special at the moment.  See the [Development Roadmap](DEV-ROADMAP.md "DEV-ROADMAP.md") for more information about when a proper Admin dashboard may be implemented.*
  * *User account's can only be deleted via direct manipulation of the database.*
* Albums
  * Users can create new albums and add media to them
  * Albums can be edited (name, included media)
  * Albums can be deleted (if the user owns the album)
* Media uploading
  * Media can be uploaded via the `/home` toolbar's `Upload` button.
  * Tags can be assigned to all media being uploaded, or to individual media items (or a mix of both).
  * Media can be deleted (if you the user owns the media)
* Tags
  * Users can create tags with 3 access levels: `Public`, `Restricted`, or `Private`.
  * Public tags are viewable by all users.
  * Restricted tags are only viewable by a user and their friends.
    * User friends are not yet implemented.
  * Private tags can only be viewed/used by the user that created them.
* Search
  * Search for all media tagged with a particular tag by clicking on a tag button.
  * Search for media similar to a particular media item via the `Find similar...` button on the media details toolbar.
  * Search for media, albums, and tags by name via the search box in the header toolbar
    * *The search box works, but is due for an upgrade in the future.  Refer to the [Development Roadmap](DEV-ROADMAP.md "DEV-ROADMAP.md") for an idea of when that may occur.*

