/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var crypto = __webpack_require__(18);

var User =
/*#__PURE__*/
function () {
  function User(props) {
    _classCallCheck(this, User);

    var inputs = JSON.parse(props)[0];
    if (!inputs) inputs = JSON.parse(props);
    if (!inputs) throw error("Can not initialize User object from given props: ".concat(props)); //console.log(inputs);
    //console.log(JSON.parse(props));

    this.id = inputs.id;
    this.name = inputs.name;
    this.email = inputs.email;
    this.password = inputs.password;
    this.salt = inputs.salt;
    this.requiresPasswordReset = inputs.requiresPasswordReset; //console.log(`ID: ${this.id} name: ${this.name} email: ${this.email} password: ${this.password} salt: ${this.salt}`);
  }

  _createClass(User, [{
    key: "verifyPassword",
    value: function verifyPassword(input) {
      if (this.password === null || this.password === "" || this.salt === null || this.salt === "" || input === null || input === "") {
        return JSON({
          message: "Password and input can not be empty or null"
        });
      }

      var saltedInput = this.salt + input;
      var hash = crypto.createHash('sha512').update(saltedInput).digest('hex'); //console.log(`Input: ${input}, hash: ${hash}, password: ${this.password}, match?: ${hash === this.password}`);

      return hash === this.password;
    }
  }, {
    key: "setPassword",
    value: function setPassword(input) {
      var salt = crypto.randomBytes(32).toString('hex');
      var saltedPass = salt + input;
      this.password = crypto.createHash('sha512').update(saltedPass).digest('hex'); //console.log(`Input: ${input}, salt: ${salt}, password: ${this.password}`);
    }
  }]);

  return User;
}();

module.exports = User;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* 
    A lot of this is taken from here: https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d
    It is incredibly informative and useful.
*/
var express = __webpack_require__(0);

var app = express();

var bodyParser = __webpack_require__(7);

var routes = __webpack_require__(8);

var mysql = __webpack_require__(45);

var uuid = __webpack_require__(46);

var session = __webpack_require__(47);

__webpack_require__(48).config();

var passport = __webpack_require__(4);

var localStrategy = __webpack_require__(49).Strategy;

var axios = __webpack_require__(2);

var User = __webpack_require__(3);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var env = process.env;
var port = env.PORT || 8080; //set our port
//configure mysql connection to database

var config = env.IS_PRODUCTION === "true" ? {
  //.env variables are always string
  host: env.DBASE_HOST_PROD,
  user: env.DBASE_USER_PROD,
  password: env.DBASE_PASSWORD_PROD,
  database: env.DBASE_DATABASE_PROD,
  connectionLimit: 100
} : {
  host: env.DBASE_HOST_DEV,
  user: env.DBASE_USER_DEV,
  password: env.DBASE_PASSWORD_DEV,
  database: env.DBASE_DATABASE_DEV,
  connectionLimit: 100
};
var connection = mysql.createPool(config); //connection pool for all dbase interactions
//configure passport to use our local strategy

passport.use(new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  axios.get("http://localhost:8080/api/users?email=".concat(email)).then(function (results) {
    //email exists in the database, so now check the password
    //console.log(results.data[0]);
    results = JSON.stringify(results.data[0]);
    var user = new User(results);
    var allowed = user.verifyPassword(password);

    if (!allowed) {
      return done(null, false, {
        message: 'Wrong or invalid password specified'
      });
    } else {
      return done(null, user);
    }
  }).catch(function (error) {
    return done(error);
  });
}));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  axios.get("http://localhost:8080/api/users/".concat(id)).then(function (results) {
    //console.log(results.data[0]);
    results = JSON.stringify(results.data[0]);
    done(null, results);
  }).catch(function (error) {
    return done(error, false);
  });
}); //configure our session-store in the database

var mysqlSessionStore = __webpack_require__(50)(session);

var sessionConnection = connection;
var sessionStore = new mysqlSessionStore({
  clearExpired: true,
  expiration: 3600000
}, sessionConnection); //add & configure sessions

app.use(session({
  genid: function genid(req) {
    //console.log('Inside the session middleware');
    //console.log(req.sessionID);
    return uuid();
  },
  name: 'besCMS.sid',
  store: sessionStore,
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); //configure the database connection

app.use(function (req, res, next) {
  //from here: https://github.com/mysqljs/mysql#pooling-connections
  //every result gets a reference to the dbase connection pool
  //res.locals.connection.query("",(error, results, fields)=>{});
  //if need multiple serial queries, do things by hand:
  //res.locals.connection.getConnection((err, connection)=>{
  //  if(err) throw err;
  //  connection.query("", (error, results, fields)=>{
  //      //make additional queries here    
  //      connection.release();   //release connection when done
  //      if(error) throw error;
  //      //do any remaining tasks  
  //  })        
  //})
  res.locals.connection = connection;
  next();
});
app.use(function (req, res, next) {
  //req.uuid = uuid();
  var host = req.get('x-forwarded-host') || '';
  var forwarded = req.get('x-forwarded-for') || ''; //console.log(req.headers);

  console.log("".concat(new Date().toISOString(), " [").concat(req.sessionID, ", ").concat(host, ", ").concat(forwarded, "] < ").concat(req.method, " ").concat(req.originalUrl));
  res.on('finish', function () {
    console.log("".concat(new Date().toISOString(), " [").concat(req.sessionID, ", ").concat(host, ", ").concat(forwarded, "] > ").concat(res.statusCode, " ").concat(res.statusMessage, " ").concat(res.get('Content-Length') || 0, "b sent"));
  });
  next();
});
app.use(express.static("public"));
app.use('/', routes);
app.listen(port, function () {
  console.log("Server now running on port: ".concat(port));
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var routes = __webpack_require__(0).Router();

var api = __webpack_require__(9);

var app = __webpack_require__(39);
/*const albums = require('./albums');
const login = require('./login');
const media = require('./media');
const tags = require('./tags');
const users = require('./users');

routes.get('/api', (req, res)=>{
    res.status(200).json({ message: "Connected!" });
});

routes.get('/credentials/check', (req, res)=>{
    console.log(req.isAuthenticated());
    req.isAuthenticated() ? res.status(200).send() : res.status(403).send();
});*/


routes.get('/home', function (req, res) {
  console.log("Can see user home: ".concat(req.isAuthenticated()));

  if (req.isAuthenticated()) {
    res.status(200);
  } else {
    res.redirect('/');
  }
});
/*routes.use('/api/albums', albums);
routes.use('/api/a', albums);

routes.use('/api/login', login);

routes.use('/api/media', media);
routes.use('/api/m', media);

routes.use('/api/tags', tags);
routes.use('/api/t', tags);

routes.use('/api/users', users);
routes.use('/api/u', users);*/

routes.use('/api', api);
routes.use('/', app);
module.exports = routes;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(0).Router();

var albums = __webpack_require__(10);

var login = __webpack_require__(17);

var media = __webpack_require__(19);

var tags = __webpack_require__(25);

var users = __webpack_require__(29);

api.get('/', function (req, res) {
  res.status(200).json({
    message: "Connected!"
  });
});
api.get('/credentials/check', function (req, res) {
  console.log(req.isAuthenticated());
  req.isAuthenticated() ? res.status(200).send() : res.status(403).send();
});
api.use('/albums', albums);
api.use('/a', albums);
api.use('/login', login);
api.use('/media', media);
api.use('/m', media);
api.use('/tags', tags);
api.use('/t', tags);
api.use('/users', users);
api.use('/u', users);
module.exports = api;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var albums = __webpack_require__(0).Router();

var all = __webpack_require__(11);

var range = __webpack_require__(12);

var single = __webpack_require__(13);

var media = __webpack_require__(14);

albums.get('/', all); //handles limits as well

albums.get('/:from-:to', range);
albums.get('/:id', single);
albums.use('/:id/media', media);
albums.use('/:id/m', media);
module.exports = albums;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  var limit = req.query.limit * 1;

  if (limit) {
    res.locals.connection.query("SELECT * FROM albums ORDER BY id DESC LIMIT ?", [limit], function (error, results, fields) {
      if (error) throw error;
      res.status(200).send(JSON.stringify(results)); //res.locals.connection.end();
    });
  } else {
    res.locals.connection.query("SELECT * FROM albums", function (error, results, fields) {
      if (error) throw error;
      res.status(200).send(JSON.stringify(results)); //res.locals.connection.end();
    });
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  var from = req.params.from * 1;
  var to = req.params.to * 1;
  var distance = to - from;
  res.locals.connection.query("SELECT * FROM albums ORDER BY id ASC LIMIT ?, ?", [from, distance + 1], function (error, results, fields) {
    if (error) throw error;
    res.status(200).send(JSON.stringify(results)); //res.locals.connection.end();
  });
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  res.locals.connection.query("SELECT * FROM albums WHERE id=?", [req.params.id], function (error, results, fields) {
    if (error) throw error;

    if (results.length === 0) {
      res.status(404).send("Invalid album ID specified");
    } else {
      res.status(200).send(JSON.stringify(results));
    } //res.locals.connection.end();

  });
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var media = __webpack_require__(0).Router({
  mergeParams: true
});

var all = __webpack_require__(15);

var range = __webpack_require__(16);

media.get('/', all);
media.get('/:from-:to', range);
module.exports = media;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  var query = "SELECT * FROM media m INNER JOIN albumsToMediaMap amm ON m.id = amm.media WHERE amm.album = ?";
  res.locals.connection.query(query, [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.status(200).send(JSON.stringify(results)); //res.locals.connection.end();
  });
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  var from = req.params.from * 1;
  var to = req.params.to * 1;
  var distance = to - from;
  var query = "SELECT * FROM media m INNER JOIN albumsToMediaMap amm ON m.id = amm.media WHERE amm.album = ? ORDER BY amm.albumIndex ASC LIMIT ?, ?";
  res.locals.connection.query(query, [req.params.id, from, distance + 1], function (error, results, fields) {
    if (error) throw error;

    if (results.length === 0) {
      res.status(404).send("Invalid album ID specified or no media exists");
    } else {
      res.status(200).send(JSON.stringify(results));
    } //res.locals.connection.end();

  });
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var User = __webpack_require__(3);

var login = __webpack_require__(0).Router();

var passport = __webpack_require__(4);

login.get('/', function (req, res) {
  console.log(req.sessionID);
  res.send('Login page');
});
login.post('/', function (req, res, next) {
  //attempted login.  check if they're a valid user from here.
  //console.log(req.body);

  /*res.locals.connection.query("SELECT * FROM users WHERE email=?", [req.body.email], (error, results, fields)=>{
      if(error) throw error;
      if(results.length === 0){
          res.status(404).send("Invalid user email specified");
      }else{
          //email exists in the database, so now check the password
          let user = new User(JSON.stringify(results));
          let allowed = user.verifyPassword(req.body.password);
          if(!allowed){
              res.status(401).send("Invalid password specified");
          } else {            
              res.status(200).send("Login successful");            
          }
      }
      res.locals.connection.end();
  });*/
  passport.authenticate('local', function (err, user, info) {
    if (info) {
      return res.send(info.message);
    }

    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/'); //questionable
    }

    console.log("req.session.passport ".concat(JSON.stringify(req.session.passport)));
    console.log("req.user ".concat(JSON.stringify(req.user)));
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }

      console.log("req.session.passport ".concat(JSON.stringify(req.session.passport)));
      console.log("req.user ".concat(JSON.stringify(req.user)));
      return res.status(200).send('Logged in');
    });
  })(req, res, next);
});
module.exports = login;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var media = __webpack_require__(0).Router();

var all = __webpack_require__(20);

var range = __webpack_require__(21);

var single = __webpack_require__(22);

var tags = __webpack_require__(23);

media.get('/', all); //handles limits as well

media.get('/:from-:to', range);
media.get('/:id', single);
media.use('/:id/tags', tags);
media.use('/:id/t', tags);
module.exports = media;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  var limit = req.query.limit * 1;

  if (req.isAuthenticated()) {
    if (limit) {
      res.locals.connection.query("SELECT * FROM media ORDER BY id DESC LIMIT ?", [limit], function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(JSON.stringify(results)); //res.locals.connection.end();
      });
    } else {
      res.locals.connection.query("SELECT * FROM media", function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(JSON.stringify(results)); //res.locals.connection.end();
      });
    }
  } else {
    //this should only return media that are public-viewable
    //might need limit implementation too
    //public media are tagged with only public tags
    var queryStg = "SELECT * FROM media m INNER JOIN tagsToMediaMap tmm ON m.id = tmm.media INNER JOIN tagsToAccessLevelMap tam ON tmm.tag = tam.tagId WHERE tam.accessLevel = 'Public' ORDER BY id ASC";

    if (limit) {
      res.locals.connection.query(queryStg + " LIMIT ?", [limit], function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(JSON.stringify(results));
      });
    } else {
      res.locals.connection.query(queryStg, function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(JSON.stringify(results));
      });
    }
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  var from = req.params.from * 1;
  var to = req.params.to * 1;
  var distance = to - from;
  res.locals.connection.query("SELECT * FROM media ORDER BY id ASC LIMIT ?, ?", [from, distance + 1], function (error, results, fields) {
    if (error) throw error;
    res.status(200).send(JSON.stringify(results)); //res.locals.connection.end();
  });
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  res.locals.connection.query("SELECT * FROM media WHERE id=?", [req.params.id], function (error, results, fields) {
    if (error) throw error;

    if (results.length === 0) {
      res.status(404).send("Invalid media ID specified");
    } else {
      res.status(200).send(JSON.stringify(results));
    } //res.locals.connection.end();

  });
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var tags = __webpack_require__(0).Router({
  mergeParams: true
});

var all = __webpack_require__(24);

tags.get('/', all);
module.exports = tags;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  var query = "SELECT * FROM tags t INNER JOIN tagsToMediaMap tmm ON t.id = tmm.tag WHERE tmm.media=?";
  res.locals.connection.query(query, [req.params.id], function (error, results, fields) {
    if (error) throw error;

    if (results.length === 0) {
      res.status(404).send("Invalid media ID specified or no tags exist");
    } else {
      res.status(200).send(JSON.stringify(results));
    } //res.locals.connection.end();

  });
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var tags = __webpack_require__(0).Router();

var all = __webpack_require__(26);

var range = __webpack_require__(27);

var single = __webpack_require__(28);

tags.get('/', all); //handles limits as well

tags.get('/:from-:to', range);
tags.get('/:id', single);
module.exports = tags;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  var limit = req.query.limit * 1;

  if (req.isAuthenticated()) {
    if (limit) {
      res.locals.connection.query("SELECT * FROM tags ORDER BY description ASC LIMIT ?", [limit], function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(JSON.stringify(results)); //res.locals.connection.end();
      });
    } else {
      res.locals.connection.query("SELECT * FROM tags", function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(JSON.stringify(results)); //res.locals.connection.end();
      });
    }
  } else {
    //this should only return tags that are public-viewable
    //might need limit implementation too
    var queryStg = "SELECT * FROM tags t INNER JOIN tagsToAccessLevelMap tam ON t.id = tam.tagId WHERE tam.accessLevel = 'Public' ORDER BY description ASC";

    if (limit) {
      res.locals.connection.query(queryStg + " LIMIT ?", [limit], function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(JSON.stringify(results));
      });
    } else {
      res.locals.connection.query(queryStg, function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(JSON.stringify(results));
      });
    }
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  var from = req.params.from * 1;
  var to = req.params.to * 1;
  var distance = to - from;
  res.locals.connection.query("SELECT * FROM tags ORDER BY id ASC LIMIT ?, ?", [from, distance + 1], function (error, results, fields) {
    if (error) throw error;
    res.status(200).send(JSON.stringify(results)); //res.locals.connection.end();
  });
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  res.locals.connection.query("SELECT * FROM tags WHERE id=?", [req.params.id], function (error, results, fields) {
    if (error) throw error;

    if (results.length === 0) {
      res.status(404).send("Invalid tag ID specified");
    } else {
      res.status(200).send(JSON.stringify(results));
    } //res.locals.connection.end();

  });
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var users = __webpack_require__(0).Router();

var all = __webpack_require__(30);

var single = __webpack_require__(31);

var albums = __webpack_require__(32);

var media = __webpack_require__(34);

var tags = __webpack_require__(37);

users.get('/', all);
users.get('/:id', single);
users.use('/:id/albums', albums);
users.use('/:id/a', albums);
users.use('/:id/media', media);
users.use('/:id/m', media);
users.use('/:id/tags', tags);
users.use('/:id/t', tags);
module.exports = users;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  var email = req.query.email;

  if (email) {
    res.locals.connection.query("SELECT * FROM users WHERE email=?", email, function (error, results, fields) {
      if (error) return done(error);
      res.status(200).send(JSON.stringify(results));
    });
  } else {
    res.locals.connection.query("SELECT * FROM users", function (error, results, fields) {
      if (error) throw error;
      res.status(200).send(JSON.stringify(results)); //res.locals.connection.end();
    });
  }
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

//const User = require('../../models/user.js');
module.exports = function (req, res) {
  //return a specific user
  res.locals.connection.query("SELECT * FROM users WHERE id=?", [req.params.id], function (error, results, fields) {
    if (error) throw error;

    if (results.length === 0) {
      res.status(404).send("Invalid user ID specified");
    } else {
      //let user = new User(JSON.stringify(results));
      //user.verifyPassword("Wr3tch3d");
      //user.setPassword("Penis");
      res.status(200).send(JSON.stringify(results));
    } //res.locals.connection.end();

  });
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var albums = __webpack_require__(0).Router({
  mergeParams: true
});

var all = __webpack_require__(33);

albums.get('/', all);
module.exports = albums;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  res.locals.connection.query("SELECT * FROM albums WHERE owner=?", [req.params.id], function (error, results, fields) {
    if (error) throw error;

    if (results.length === 0) {
      res.status(404).send("Invalid user ID specified or no albums exist");
    } else {
      res.status(200).send(JSON.stringify(results));
    } //res.locals.connection.end();

  });
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var media = __webpack_require__(0).Router({
  mergeParams: true
});

var all = __webpack_require__(35);

var range = __webpack_require__(36);

media.get('/', all);
media.get('/:from-:to', range);
module.exports = media;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  res.locals.connection.query("SELECT * FROM media WHERE owner=?", [req.params.id], function (error, results, fields) {
    if (error) throw error;

    if (results.length === 0) {
      res.status(404).send("Invalid user ID specified or no media exists");
    } else {
      res.status(200).send(JSON.stringify(results));
    } //res.locals.connection.end();

  });
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  var from = req.params.from * 1;
  var to = req.params.to * 1;
  var distance = to - from;
  res.locals.connection.query("SELECT * FROM media WHERE owner=? ORDER BY id ASC LIMIT ?, ?", [req.params.id, from, distance + 1], function (error, results, fields) {
    if (error) throw error;

    if (results.length === 0) {
      res.status(404).send("Invalid user ID specified or no media exists");
    } else {
      res.status(200).send(JSON.stringify(results));
    } //res.locals.connection.end();

  });
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var tags = __webpack_require__(0).Router({
  mergeParams: true
});

var all = __webpack_require__(38);

tags.get('/', all);
module.exports = tags;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = function (req, res) {
  res.locals.connection.query("SELECT * FROM tags WHERE owner=?", [req.params.id], function (error, results, fields) {
    if (error) throw error;

    if (results.length === 0) {
      res.status(404).send("Invalid user ID specified or no tags exist");
    } else {
      res.status(200).send(JSON.stringify(results));
    } //res.locals.connection.end();

  });
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var app_routes = __webpack_require__(0).Router();

var React = __webpack_require__(1);

var ReactDOMServer = __webpack_require__(40);

var ReactRouterDOM = __webpack_require__(5);

var App = __webpack_require__(41).default;

app_routes.get('/', function (req, res) {
  //var html = "<h1>I hate this at times.</h1>";
  //console.log(App);
  var html = ReactDOMServer.renderToString(React.createElement(ReactRouterDOM.StaticRouter, {
    location: req.url
  }, React.createElement(App, null))); //console.log(html);

  res.status(200).send("\n    <!DOCTYPE html>\n    <html>\n        <head>\n            <title>Black Eagle Software CMS</title>\n            <link rel=\"shortcut icon\" href=\"favicon-16x16.png\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n            <link rel=\"stylesheet\" href=\"global.css\">\n            <script src=\"/bundle.js\" defer></script>            \n        </head>\n        <body>\n            <div id=\"app\">".concat(html, "</div>            \n        </body>\n    </html>\n    "));
});
module.exports = app_routes;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_landing_container__ = __webpack_require__(42);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



 //import AuthRoute from './components/authRoute.component';

 //import UserHomeContainer from './containers/user-home.container';

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      isAuthenticated: false
    };
    return _this;
  }

  _createClass(App, [{
    key: "handleLogin",
    value: function handleLogin() {
      //return <Redirect to='/home'/>
      this.verifyAuthentication();
    }
  }, {
    key: "verifyAuthentication",
    value: function verifyAuthentication() {
      var _this2 = this;

      __WEBPACK_IMPORTED_MODULE_2_axios___default.a.get('/credentials/check').then(function (res) {
        console.log(res.status);
        var auth = _this2.state.isAuthenticated;

        if (res.status === 200) {
          if (!auth) {
            //needs to handle admin access
            _this2.setState({
              isAuthenticated: true
            }, function () {
              _this2.props.history.push('/home'); //go to '/' on logout

            });
          }
        } else {
          _this2.setState({
            isAuthenticated: false
          }, function () {
            _this2.props.history.push('/');
          });
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.verifyAuthentication();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Switch"], null, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], {
        exact: true,
        path: "/",
        render: function render(props, routeProps) {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__containers_landing_container__["a" /* default */], _extends({}, props, routeProps, {
            onLogin: function onLogin() {
              return _this3.handleLogin();
            }
          }));
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], {
        path: "/admin",
        render: function render() {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null, "This is the Admin page");
        }
      }));
    }
  }]);

  return App;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["withRouter"])(App));

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Landing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_header_component__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_login_form_component__ = __webpack_require__(44);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Landing =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Landing, _React$Component);

  function Landing(props) {
    var _this;

    _classCallCheck(this, Landing);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Landing).call(this, props));
    _this.state = {
      show_login: false,
      show_register: false
    };
    return _this;
  }

  _createClass(Landing, [{
    key: "handleHeaderBtnClick",
    value: function handleHeaderBtnClick(name) {
      switch (name) {
        case 'home':
          break;

        case 'login':
          this.setState({
            show_login: true
          });
          break;

        case 'register':
          break;

        case 'default':
          break;
      }
    }
  }, {
    key: "handleLogin",
    value: function handleLogin() {
      this.props.onLogin(); //go to the user's home page
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var contStyle = {
        display: "flex",
        flexFlow: "row wrap"
      };
      var pageStyle = {
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "1em",
        marginRight: "1em",
        width: "100%",
        height: "100%"
      };
      var logoStyle = {
        display: "block",
        width: "10em",
        margin: "0 auto 1em"
      };
      var introStyle = {
        fontSize: "1.5em",
        textAlign: "center"
      };
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        id: "content",
        style: contStyle
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_header_component__["a" /* default */], {
        isAuthenticated: false,
        onBtnClick: function onBtnClick(name) {
          return _this2.handleHeaderBtnClick(name);
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        style: pageStyle
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", {
        style: logoStyle,
        src: "Logo 3a_resized.png"
      }), !this.state.show_login && !this.state.show_register && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        style: introStyle
      }, "Welcome to the Black Eagle Software CMS.", __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null), "Please login or register to continue."), this.state.show_login && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_login_form_component__["a" /* default */], {
        onLogin: function onLogin() {
          return _this2.handleLogin();
        }
      })));
    }
  }]);

  return Landing;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Header; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Header =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "handleBtnClick",
    value: function handleBtnClick(name) {
      this.props.onBtnClick(name);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var headerStyle = {
        display: "flex",
        flexFlow: "row wrap",
        width: "100%",
        height: "2em",
        background: "#ebebeb",
        lineHeight: "2em",
        fontSize: "1.25em",
        paddingLeft: "0.5em",
        paddingRight: "0.5em"
      };
      var titleStyle = {
        paddingRight: "1em"
      };
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        style: headerStyle
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "headerBtn",
        style: titleStyle,
        onClick: function onClick() {
          return _this.handleBtnClick('home');
        }
      }, "Black Eagle Software CMS"), this.props.isAuthenticated && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "headerBtn",
        onClick: function onClick() {
          return _this.handleBtnClick('tags');
        }
      }, "Tags"), this.props.isAuthenticated && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "headerBtn",
        onClick: function onClick() {
          return _this.handleBtnClick('albums');
        }
      }, "Albums"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        style: {
          flex: "1 1 auto"
        }
      }), this.props.isAuthenticated && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "headerBtn",
        onClick: function onClick() {
          return _this.handleBtnClick('upload');
        }
      }, "Upload"), this.props.isAuthenticated && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "headerBtn",
        onClick: function onClick() {
          return _this.handleBtnClick('profile');
        }
      }, "Username"), !this.props.isAuthenticated && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "headerBtn",
        onClick: function onClick() {
          return _this.handleBtnClick('login');
        }
      }, "Login"), !this.props.isAuthenticated && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: "headerBtn",
        onClick: function onClick() {
          return _this.handleBtnClick('register');
        }
      }, "Register"));
    }
  }]);

  return Header;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginForm; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }





var LoginForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  function LoginForm(props) {
    var _this;

    _classCallCheck(this, LoginForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginForm).call(this, props));
    _this.state = {
      email: "",
      is_email_bad: true,
      password: "",
      is_password_bad: true,
      redirectTo: null
    };
    _this.handleEmailChange = _this.handleEmailChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handlePasswordChange = _this.handlePasswordChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleFormSubmit = _this.handleFormSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(LoginForm, [{
    key: "handleEmailChange",
    value: function handleEmailChange(event) {
      var val = event.target.value;
      var bad = val === "";
      this.setState({
        email: val,
        is_email_bad: bad
      });
    }
  }, {
    key: "handlePasswordChange",
    value: function handlePasswordChange(event) {
      var val = event.target.value;
      var bad = val === "";
      this.setState({
        password: val,
        is_password_bad: bad
      });
    }
  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(event) {
      var _this2 = this;

      if (this.state.email === "" || this.state.password === "") {
        return;
      }

      var data = {
        email: this.state.email,
        password: this.state.password
      };
      console.log(data);
      __WEBPACK_IMPORTED_MODULE_1_axios___default.a.post("/api/login", data).then(function (res) {
        if (res.status === 200) {
          _this2.setState({
            redirectTo: '/home'
          });

          _this2.props.onLogin();
        }
      });
      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.redirectTo) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Redirect"], {
          to: {
            pathname: this.state.redirectTo
          }
        });
      } else {
        var formStyle = {
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "center",
          justifyContent: "center"
        };
        var inputStyle = {
          width: "80%",
          margin: ".25em",
          fontSize: "1em"
        };
        var emailClass = this.state.is_email_bad ? "bad_input" : "";
        var passClass = this.state.is_password_bad ? "bad_input" : "";
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("form", {
          style: formStyle,
          onSubmit: this.handleFormSubmit
        }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
          className: emailClass,
          style: inputStyle,
          type: "text",
          name: "email",
          placeholder: "Email",
          required: true,
          autoFocus: true,
          onChange: this.handleEmailChange
        }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
          className: passClass,
          style: inputStyle,
          type: "password",
          name: "password",
          placeholder: "Password",
          required: true,
          onChange: this.handlePasswordChange
        }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
          style: inputStyle,
          type: "submit",
          value: "Log in"
        }));
      }
    }
  }]);

  return LoginForm;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("express-mysql-session");

/***/ })
/******/ ]);