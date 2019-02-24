Black Eagle Software presents a Content Management System

##Summary
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

###What BES CMS Does Different
BES CMS is basically a React front-end to a Node.js server that can connect to a SQL database.  Media is uploaded to the server from the front-end, and the server stores the media and adds references in the database.  The front-end allows for adding tags to media.  Tags can be a person's name, or an object, or an event, for instance.  Mappings between tags and media are stored in the databse.

##Installation

###Database Setup

###.env File
Create a .env file in the root project folder.  The .env file will need the following entries in order for the Node.js server to function:
```javascript
IS_PRODUCTION=true

//Database connection details
DBASE_HOST_PROD='some value'
DBASE_USER_PROD='some value'
DBASE_PASSWORD_PROD='some value'
DBASE_PASSWORD_PROD='some value'

//Session variables
SESSION_SECRET='some value'
```

BES CMS supports having a separate development and production database.  Set `IS_PRODUCTION=false` and add the following entries for use with the development database:
```javascript
//Development database connection details
DBASE_HOST_DEV='some value'
DBASE_USER_DEV='some value'
DBASE_PASSWORD_DEV='some value'
DBASE_DATABASE_DEV='some value'
```
####Network Share Development
For some systems doing development on a network share, the Node.js webpack may not pick up when files are changed.  Similarly, nodemon may not reload the server after files change.  One possible work around for this is to add the following entry to the .env file:
```javascript
//fix for development folder living on a network share
CHOKIDAR_USEPOLLING=true
```

##Node.js Server API End Points

##Development