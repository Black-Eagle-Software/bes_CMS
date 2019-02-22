Black Eagle Software presents a Content Management System

##Summary

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