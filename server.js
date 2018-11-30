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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}var crypto=__webpack_require__(21);var User=/*#__PURE__*/function(){function User(props){_classCallCheck(this,User);var inputs=JSON.parse(props)[0];if(!inputs)inputs=JSON.parse(props);if(!inputs)throw error("Can not initialize User object from given props: ".concat(props));//console.log(inputs);
//console.log(JSON.parse(props));
this.id=inputs.id;this.name=inputs.name;this.email=inputs.email;this.password=inputs.password;this.salt=inputs.salt;this.requiresPasswordReset=inputs.requiresPasswordReset;//console.log(`ID: ${this.id} name: ${this.name} email: ${this.email} password: ${this.password} salt: ${this.salt}`);
}_createClass(User,[{key:"verifyPassword",value:function verifyPassword(input){if(this.password===null||this.password===""||this.salt===null||this.salt===""||input===null||input===""){return JSON({message:"Password and input can not be empty or null"});}var saltedInput=this.salt+input;var hash=crypto.createHash('sha512').update(saltedInput).digest('hex');//console.log(`Input: ${input}, hash: ${hash}, password: ${this.password}, match?: ${hash === this.password}`);
return hash===this.password;}},{key:"setPassword",value:function setPassword(input){var salt=crypto.randomBytes(32).toString('hex');var saltedPass=salt+input;this.password=crypto.createHash('sha512').update(saltedPass).digest('hex');//console.log(`Input: ${input}, salt: ${salt}, password: ${this.password}`);
}}]);return User;}();module.exports=User;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Header; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}var Header=/*#__PURE__*/function(_React$Component){_inherits(Header,_React$Component);function Header(){_classCallCheck(this,Header);return _possibleConstructorReturn(this,_getPrototypeOf(Header).apply(this,arguments));}_createClass(Header,[{key:"handleBtnClick",value:function handleBtnClick(name){this.props.onBtnClick(name);}},{key:"render",value:function render(){var _this=this;var headerStyle={display:"flex",flexFlow:"row wrap",width:"100%",height:"2em",background:"#ebebeb",lineHeight:"2em",fontSize:"1.25em",paddingLeft:"0.5em",paddingRight:"0.5em"};var titleStyle={paddingRight:"1em"};return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:headerStyle},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"headerBtn",style:titleStyle,onClick:function onClick(){return _this.handleBtnClick('home');}},"Black Eagle Software CMS"),this.props.isAuthenticated&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"headerBtn",onClick:function onClick(){return _this.handleBtnClick('tags');}},"Tags"),this.props.isAuthenticated&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"headerBtn",onClick:function onClick(){return _this.handleBtnClick('albums');}},"Albums"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:{flex:"1 1 auto"}}),this.props.isAuthenticated&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"headerBtn",onClick:function onClick(){return _this.handleBtnClick('upload');}},"Upload"),this.props.isAuthenticated&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"headerBtn",onClick:function onClick(){return _this.handleBtnClick('profile');}},"Username"),!this.props.isAuthenticated&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"headerBtn",onClick:function onClick(){return _this.handleBtnClick('login');}},"Login"),!this.props.isAuthenticated&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"headerBtn",onClick:function onClick(){return _this.handleBtnClick('register');}},"Register"));}}]);return Header;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagsSelectableList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tag_selectable_component__ = __webpack_require__(52);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}var TagsSelectableList=/*#__PURE__*/function(_React$Component){_inherits(TagsSelectableList,_React$Component);function TagsSelectableList(){_classCallCheck(this,TagsSelectableList);return _possibleConstructorReturn(this,_getPrototypeOf(TagsSelectableList).apply(this,arguments));}_createClass(TagsSelectableList,[{key:"render",value:function render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,this.props.tags.map(function(tag){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__tag_selectable_component__["a" /* default */],{key:tag.id,description:tag.description});}));}}]);return TagsSelectableList;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* 
    A lot of this is taken from here: https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d
    It is incredibly informative and useful.
*/var express=__webpack_require__(1);var app=express();var bodyParser=__webpack_require__(10);var routes=__webpack_require__(11);var mysql=__webpack_require__(58);var uuid=__webpack_require__(8);var session=__webpack_require__(59);__webpack_require__(60).config();var passport=__webpack_require__(5);var localStrategy=__webpack_require__(61).Strategy;var axios=__webpack_require__(3);var User=__webpack_require__(4);app.use(bodyParser.urlencoded({extended:true}));app.use(bodyParser.json());var env=process.env;var port=env.PORT||8080;//set our port
//configure mysql connection to database
var config=env.IS_PRODUCTION==="true"?{//.env variables are always string
host:env.DBASE_HOST_PROD,user:env.DBASE_USER_PROD,password:env.DBASE_PASSWORD_PROD,database:env.DBASE_DATABASE_PROD,connectionLimit:100}:{host:env.DBASE_HOST_DEV,user:env.DBASE_USER_DEV,password:env.DBASE_PASSWORD_DEV,database:env.DBASE_DATABASE_DEV,connectionLimit:100};var connection=mysql.createPool(config);//connection pool for all dbase interactions
//configure passport to use our local strategy
passport.use(new localStrategy({usernameField:'email',passwordField:'password',passReqToCallback:true},function(req,email,password,done){axios.get("http://localhost:8080/api/users?email=".concat(email)).then(function(results){//email exists in the database, so now check the password
//console.log(results.data[0]);
results=JSON.stringify(results.data[0]);var user=new User(results);var allowed=user.verifyPassword(password);if(!allowed){return done(null,false,{message:'Wrong or invalid password specified'});}else{return done(null,user);}}).catch(function(error){return done(error);});}));passport.serializeUser(function(user,done){done(null,user.id);});passport.deserializeUser(function(id,done){axios.get("http://localhost:8080/api/users/".concat(id)).then(function(results){//console.log(results.data[0]);
results=JSON.stringify(results.data[0]);done(null,results);}).catch(function(error){return done(error,false);});});//configure our session-store in the database
var mysqlSessionStore=__webpack_require__(62)(session);var sessionConnection=connection;var sessionStore=new mysqlSessionStore({clearExpired:true,expiration:3600000},sessionConnection);//add & configure sessions
app.use(session({genid:function genid(req){//console.log('Inside the session middleware');
//console.log(req.sessionID);
return uuid();},name:'besCMS.sid',store:sessionStore,secret:env.SESSION_SECRET,resave:false,saveUninitialized:true}));app.use(passport.initialize());app.use(passport.session());//configure the database connection
app.use(function(req,res,next){//from here: https://github.com/mysqljs/mysql#pooling-connections
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
res.locals.connection=connection;next();});app.use(function(req,res,next){//req.uuid = uuid();
var host=req.get('x-forwarded-host')||'';var forwarded=req.get('x-forwarded-for')||'';//console.log(req.headers);
console.log("".concat(new Date().toISOString()," [").concat(req.sessionID,", ").concat(host,", ").concat(forwarded,"] < ").concat(req.method," ").concat(req.originalUrl));res.on('finish',function(){console.log("".concat(new Date().toISOString()," [").concat(req.sessionID,", ").concat(host,", ").concat(forwarded,"] > ").concat(res.statusCode," ").concat(res.statusMessage," ").concat(res.get('Content-Length')||0,"b sent"));});next();});app.use(express.static("public"));app.use('/',routes);app.listen(port,function(){console.log("Server now running on port: ".concat(port));});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var routes=__webpack_require__(1).Router();var api=__webpack_require__(12);var app=__webpack_require__(42);/*const albums = require('./albums');
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
});*/routes.get('/home',function(req,res){console.log("Can see user home: ".concat(req.isAuthenticated()));if(req.isAuthenticated()){res.status(200);}else{res.redirect('/');}});/*routes.use('/api/albums', albums);
routes.use('/api/a', albums);

routes.use('/api/login', login);

routes.use('/api/media', media);
routes.use('/api/m', media);

routes.use('/api/tags', tags);
routes.use('/api/t', tags);

routes.use('/api/users', users);
routes.use('/api/u', users);*/routes.use('/api',api);routes.use('/',app);module.exports=routes;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var api=__webpack_require__(1).Router();var albums=__webpack_require__(13);var login=__webpack_require__(20);var media=__webpack_require__(22);var tags=__webpack_require__(28);var users=__webpack_require__(32);api.get('/',function(req,res){res.status(200).json({message:"Connected!"});});api.get('/credentials/check',function(req,res){console.log(req.isAuthenticated());req.isAuthenticated()?res.status(200).send():res.status(403).send();});api.use('/albums',albums);api.use('/a',albums);api.use('/login',login);api.use('/media',media);api.use('/m',media);api.use('/tags',tags);api.use('/t',tags);api.use('/users',users);api.use('/u',users);module.exports=api;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var albums=__webpack_require__(1).Router();var all=__webpack_require__(14);var range=__webpack_require__(15);var single=__webpack_require__(16);var media=__webpack_require__(17);albums.get('/',all);//handles limits as well
albums.get('/:from-:to',range);albums.get('/:id',single);albums.use('/:id/media',media);albums.use('/:id/m',media);module.exports=albums;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports=function(req,res){var limit=req.query.limit*1;if(limit){res.locals.connection.query("SELECT * FROM albums ORDER BY id DESC LIMIT ?",[limit],function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));//res.locals.connection.end();
});}else{res.locals.connection.query("SELECT * FROM albums",function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));//res.locals.connection.end();
});}};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports=function(req,res){var from=req.params.from*1;var to=req.params.to*1;var distance=to-from;res.locals.connection.query("SELECT * FROM albums ORDER BY id ASC LIMIT ?, ?",[from,distance+1],function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));//res.locals.connection.end();
});};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports=function(req,res){res.locals.connection.query("SELECT * FROM albums WHERE id=?",[req.params.id],function(error,results,fields){if(error)throw error;if(results.length===0){res.status(404).send("Invalid album ID specified");}else{res.status(200).send(JSON.stringify(results));}//res.locals.connection.end();
});};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var media=__webpack_require__(1).Router({mergeParams:true});var all=__webpack_require__(18);var range=__webpack_require__(19);media.get('/',all);media.get('/:from-:to',range);module.exports=media;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports=function(req,res){var query="SELECT * FROM media m INNER JOIN albumsToMediaMap amm ON m.id = amm.media WHERE amm.album = ?";res.locals.connection.query(query,[req.params.id],function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));//res.locals.connection.end();
});};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports=function(req,res){var from=req.params.from*1;var to=req.params.to*1;var distance=to-from;var query="SELECT * FROM media m INNER JOIN albumsToMediaMap amm ON m.id = amm.media WHERE amm.album = ? ORDER BY amm.albumIndex ASC LIMIT ?, ?";res.locals.connection.query(query,[req.params.id,from,distance+1],function(error,results,fields){if(error)throw error;if(results.length===0){res.status(404).send("Invalid album ID specified or no media exists");}else{res.status(200).send(JSON.stringify(results));}//res.locals.connection.end();
});};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var User=__webpack_require__(4);var login=__webpack_require__(1).Router();var passport=__webpack_require__(5);login.get('/',function(req,res){console.log(req.sessionID);res.send('Login page');});login.post('/',function(req,res,next){//attempted login.  check if they're a valid user from here.
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
    });*/passport.authenticate('local',function(err,user,info){if(info){return res.send(info.message);}if(err){return next(err);}if(!user){return res.redirect('/');//questionable
}console.log("req.session.passport ".concat(JSON.stringify(req.session.passport)));console.log("req.user ".concat(JSON.stringify(req.user)));req.login(user,function(err){if(err){return next(err);}console.log("req.session.passport ".concat(JSON.stringify(req.session.passport)));console.log("req.user ".concat(JSON.stringify(req.user)));return res.status(200).send('Logged in');});})(req,res,next);});module.exports=login;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var media=__webpack_require__(1).Router();var all=__webpack_require__(23);var range=__webpack_require__(24);var single=__webpack_require__(25);var tags=__webpack_require__(26);media.get('/',all);//handles limits as well
media.get('/:from-:to',range);media.get('/:id',single);media.use('/:id/tags',tags);media.use('/:id/t',tags);module.exports=media;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports=function(req,res){var limit=req.query.limit*1;if(req.isAuthenticated()){if(limit){res.locals.connection.query("SELECT * FROM media ORDER BY id DESC LIMIT ?",[limit],function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));//res.locals.connection.end();
});}else{res.locals.connection.query("SELECT * FROM media",function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));//res.locals.connection.end();
});}}else{//this should only return media that are public-viewable
//might need limit implementation too
//public media are tagged with only public tags
var queryStg="SELECT * FROM media m INNER JOIN tagsToMediaMap tmm ON m.id = tmm.media INNER JOIN tagsToAccessLevelMap tam ON tmm.tag = tam.tagId WHERE tam.accessLevel = 'Public' ORDER BY id ASC";if(limit){res.locals.connection.query(queryStg+" LIMIT ?",[limit],function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));});}else{res.locals.connection.query(queryStg,function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));});}}};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports=function(req,res){var from=req.params.from*1;var to=req.params.to*1;var distance=to-from;res.locals.connection.query("SELECT * FROM media ORDER BY id ASC LIMIT ?, ?",[from,distance+1],function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));//res.locals.connection.end();
});};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports=function(req,res){res.locals.connection.query("SELECT * FROM media WHERE id=?",[req.params.id],function(error,results,fields){if(error)throw error;if(results.length===0){res.status(404).send("Invalid media ID specified");}else{res.status(200).send(JSON.stringify(results));}//res.locals.connection.end();
});};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var tags=__webpack_require__(1).Router({mergeParams:true});var all=__webpack_require__(27);tags.get('/',all);module.exports=tags;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports=function(req,res){var query="SELECT * FROM tags t INNER JOIN tagsToMediaMap tmm ON t.id = tmm.tag WHERE tmm.media=?";res.locals.connection.query(query,[req.params.id],function(error,results,fields){if(error)throw error;if(results.length===0){res.status(404).send("Invalid media ID specified or no tags exist");}else{res.status(200).send(JSON.stringify(results));}//res.locals.connection.end();
});};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var tags=__webpack_require__(1).Router();var all=__webpack_require__(29);var range=__webpack_require__(30);var single=__webpack_require__(31);tags.get('/',all);//handles limits as well
tags.get('/:from-:to',range);tags.get('/:id',single);module.exports=tags;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports=function(req,res){var limit=req.query.limit*1;if(req.isAuthenticated()){if(limit){res.locals.connection.query("SELECT * FROM tags ORDER BY description ASC LIMIT ?",[limit],function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));//res.locals.connection.end();
});}else{res.locals.connection.query("SELECT * FROM tags",function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));//res.locals.connection.end();
});}}else{//this should only return tags that are public-viewable
//might need limit implementation too
var queryStg="SELECT * FROM tags t INNER JOIN tagsToAccessLevelMap tam ON t.id = tam.tagId WHERE tam.accessLevel = 'Public' ORDER BY description ASC";if(limit){res.locals.connection.query(queryStg+" LIMIT ?",[limit],function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));});}else{res.locals.connection.query(queryStg,function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));});}}};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports=function(req,res){var from=req.params.from*1;var to=req.params.to*1;var distance=to-from;res.locals.connection.query("SELECT * FROM tags ORDER BY id ASC LIMIT ?, ?",[from,distance+1],function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));//res.locals.connection.end();
});};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports=function(req,res){res.locals.connection.query("SELECT * FROM tags WHERE id=?",[req.params.id],function(error,results,fields){if(error)throw error;if(results.length===0){res.status(404).send("Invalid tag ID specified");}else{res.status(200).send(JSON.stringify(results));}//res.locals.connection.end();
});};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var users=__webpack_require__(1).Router();var all=__webpack_require__(33);var single=__webpack_require__(34);var albums=__webpack_require__(35);var media=__webpack_require__(37);var tags=__webpack_require__(40);users.get('/',all);users.get('/:id',single);users.use('/:id/albums',albums);users.use('/:id/a',albums);users.use('/:id/media',media);users.use('/:id/m',media);users.use('/:id/tags',tags);users.use('/:id/t',tags);module.exports=users;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports=function(req,res){var email=req.query.email;if(email){res.locals.connection.query("SELECT * FROM users WHERE email=?",email,function(error,results,fields){if(error)return done(error);res.status(200).send(JSON.stringify(results));});}else{res.locals.connection.query("SELECT * FROM users",function(error,results,fields){if(error)throw error;res.status(200).send(JSON.stringify(results));//res.locals.connection.end();
});}};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

//const User = require('../../models/user.js');
module.exports=function(req,res){//return a specific user
res.locals.connection.query("SELECT * FROM users WHERE id=?",[req.params.id],function(error,results,fields){if(error)throw error;if(results.length===0){res.status(404).send("Invalid user ID specified");}else{//let user = new User(JSON.stringify(results));
//user.verifyPassword("Wr3tch3d");
//user.setPassword("Penis");
res.status(200).send(JSON.stringify(results));}//res.locals.connection.end();
});};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var albums=__webpack_require__(1).Router({mergeParams:true});var all=__webpack_require__(36);albums.get('/',all);module.exports=albums;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports=function(req,res){res.locals.connection.query("SELECT * FROM albums WHERE owner=?",[req.params.id],function(error,results,fields){if(error)throw error;if(results.length===0){res.status(404).send("Invalid user ID specified or no albums exist");}else{res.status(200).send(JSON.stringify(results));}//res.locals.connection.end();
});};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var media=__webpack_require__(1).Router({mergeParams:true});var all=__webpack_require__(38);var range=__webpack_require__(39);media.get('/',all);media.get('/:from-:to',range);module.exports=media;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports=function(req,res){res.locals.connection.query("SELECT * FROM media WHERE owner=?",[req.params.id],function(error,results,fields){if(error)throw error;if(results.length===0){res.status(404).send("Invalid user ID specified or no media exists");}else{res.status(200).send(JSON.stringify(results));}//res.locals.connection.end();
});};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports=function(req,res){var from=req.params.from*1;var to=req.params.to*1;var distance=to-from;res.locals.connection.query("SELECT * FROM media WHERE owner=? ORDER BY id ASC LIMIT ?, ?",[req.params.id,from,distance+1],function(error,results,fields){if(error)throw error;if(results.length===0){res.status(404).send("Invalid user ID specified or no media exists");}else{res.status(200).send(JSON.stringify(results));}//res.locals.connection.end();
});};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var tags=__webpack_require__(1).Router({mergeParams:true});var all=__webpack_require__(41);tags.get('/',all);module.exports=tags;

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports=function(req,res){res.locals.connection.query("SELECT * FROM tags WHERE owner=?",[req.params.id],function(error,results,fields){if(error)throw error;if(results.length===0){res.status(404).send("Invalid user ID specified or no tags exist");}else{res.status(200).send(JSON.stringify(results));}//res.locals.connection.end();
});};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var app_routes=__webpack_require__(1).Router();var React=__webpack_require__(0);var ReactDOMServer=__webpack_require__(43);var ReactRouterDOM=__webpack_require__(2);var App=__webpack_require__(44).default;app_routes.get('/',function(req,res){//var html = "<h1>I hate this at times.</h1>";
//console.log(App);
var html=ReactDOMServer.renderToString(React.createElement(ReactRouterDOM.StaticRouter,{location:req.url,context:{}},React.createElement(App,null)));//console.log(html);
res.status(200).send("\n    <!DOCTYPE html>\n    <html>\n        <head>\n            <title>Black Eagle Software CMS</title>\n            <link rel=\"shortcut icon\" href=\"favicon-16x16.png\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n            <link rel=\"stylesheet\" href=\"global.css\">\n            <script src=\"/bundle.js\" defer></script>            \n        </head>\n        <body>\n            <div id=\"app\">".concat(html,"</div>            \n        </body>\n    </html>\n    "));});module.exports=app_routes;

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_landing_container__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__containers_user_home_container__ = __webpack_require__(47);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _extends(){_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};return _extends.apply(this,arguments);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}//import AuthRoute from './components/authRoute.component';
var App=/*#__PURE__*/function(_React$Component){_inherits(App,_React$Component);function App(props){var _this;_classCallCheck(this,App);_this=_possibleConstructorReturn(this,_getPrototypeOf(App).call(this,props));_this.state={isAuthenticated:false};return _this;}_createClass(App,[{key:"handleLogin",value:function handleLogin(){//return <Redirect to='/home'/>
this.verifyAuthentication();}},{key:"verifyAuthentication",value:function verifyAuthentication(){var _this2=this;__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get('/api/credentials/check').then(function(res){console.log(res.status);var auth=_this2.state.isAuthenticated;if(res.status===200){if(!auth){//needs to handle admin access
_this2.setState({isAuthenticated:true},function(){_this2.props.history.push('/home');//go to '/' on logout
});}}else{_this2.setState({isAuthenticated:false},function(){_this2.props.history.push('/');});}});}},{key:"componentDidMount",value:function componentDidMount(){//this.verifyAuthentication();
}},{key:"render",value:function render(){var _this3=this;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Switch"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"],{exact:true,path:"/",render:function render(props,routeProps){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__containers_landing_container__["a" /* default */],_extends({},props,routeProps,{onLogin:function onLogin(){return _this3.handleLogin();}}));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"],{path:"/home",render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__containers_user_home_container__["a" /* default */],_extends({isAuthenticated:_this3.state.isAuthenticated},props));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"],{path:"/admin",render:function render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,"This is the Admin page");}}));}}]);return App;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["withRouter"])(App));

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Landing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_header_component__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_login_form_component__ = __webpack_require__(46);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}var Landing=/*#__PURE__*/function(_React$Component){_inherits(Landing,_React$Component);function Landing(props){var _this;_classCallCheck(this,Landing);_this=_possibleConstructorReturn(this,_getPrototypeOf(Landing).call(this,props));_this.state={show_login:false,show_register:false};return _this;}_createClass(Landing,[{key:"handleHeaderBtnClick",value:function handleHeaderBtnClick(name){switch(name){case'home':break;case'login':this.setState({show_login:true});break;case'register':break;case'default':break;}}},{key:"handleLogin",value:function handleLogin(){this.props.onLogin();//go to the user's home page
}},{key:"render",value:function render(){var _this2=this;var contStyle={display:"flex",flexFlow:"row wrap"};var pageStyle={display:"flex",flexFlow:"column wrap",alignItems:"center",justifyContent:"center",marginLeft:"1em",marginRight:"1em",width:"100%",height:"100%"};var logoStyle={display:"block",width:"10em",margin:"0 auto 1em"};var introStyle={fontSize:"1.5em",textAlign:"center"};return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{id:"content",style:contStyle},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_header_component__["a" /* default */],{isAuthenticated:false,onBtnClick:function onBtnClick(name){return _this2.handleHeaderBtnClick(name);}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:pageStyle},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{style:logoStyle,src:"Logo 3a_resized.png"}),!this.state.show_login&&!this.state.show_register&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:introStyle},"Welcome to the Black Eagle Software CMS.",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Please login or register to continue."),this.state.show_login&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_login_form_component__["a" /* default */],{onLogin:function onLogin(){return _this2.handleLogin();}})));}}]);return Landing;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginForm; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}var LoginForm=/*#__PURE__*/function(_React$Component){_inherits(LoginForm,_React$Component);function LoginForm(props){var _this;_classCallCheck(this,LoginForm);_this=_possibleConstructorReturn(this,_getPrototypeOf(LoginForm).call(this,props));_this.state={email:"",is_email_bad:true,password:"",is_password_bad:true,redirectTo:null};_this.handleEmailChange=_this.handleEmailChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));_this.handlePasswordChange=_this.handlePasswordChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));_this.handleFormSubmit=_this.handleFormSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));return _this;}_createClass(LoginForm,[{key:"handleEmailChange",value:function handleEmailChange(event){var val=event.target.value;var bad=val==="";this.setState({email:val,is_email_bad:bad});}},{key:"handlePasswordChange",value:function handlePasswordChange(event){var val=event.target.value;var bad=val==="";this.setState({password:val,is_password_bad:bad});}},{key:"handleFormSubmit",value:function handleFormSubmit(event){var _this2=this;if(this.state.email===""||this.state.password===""){return;}var data={email:this.state.email,password:this.state.password};console.log(data);__WEBPACK_IMPORTED_MODULE_1_axios___default.a.post("/api/login",data).then(function(res){if(res.status===200){_this2.setState({redirectTo:'/home'});_this2.props.onLogin();}});event.preventDefault();}},{key:"render",value:function render(){if(this.state.redirectTo){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Redirect"],{to:{pathname:this.state.redirectTo}});}else{var formStyle={display:"flex",flexFlow:"row wrap",alignItems:"center",justifyContent:"center"};var inputStyle={width:"80%",margin:".25em",fontSize:"1em"};var emailClass=this.state.is_email_bad?"bad_input":"";var passClass=this.state.is_password_bad?"bad_input":"";return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("form",{style:formStyle,onSubmit:this.handleFormSubmit},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input",{className:emailClass,style:inputStyle,type:"text",name:"email",placeholder:"Email",required:true,autoFocus:true,onChange:this.handleEmailChange}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input",{className:passClass,style:inputStyle,type:"password",name:"password",placeholder:"Password",required:true,onChange:this.handlePasswordChange}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input",{style:inputStyle,type:"submit",value:"Log in"}));}}}]);return LoginForm;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserHomeContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_header_component__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_image_tiles_list_component__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_media_zoom_component__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_upload_component__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_tags_component__ = __webpack_require__(57);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}//import axios from 'axios';
var UserHomeContainer=/*#__PURE__*/function(_React$Component){_inherits(UserHomeContainer,_React$Component);function UserHomeContainer(props){var _this;_classCallCheck(this,UserHomeContainer);_this=_possibleConstructorReturn(this,_getPrototypeOf(UserHomeContainer).call(this,props));_this.state={media:[],tags:[],is_image_focused:false,zoomed_image:{},show_albums:false,show_tags:false,show_upload:false};return _this;}_createClass(UserHomeContainer,[{key:"componentDidMount",value:function componentDidMount(){var _this2=this;//read our media from the dbase
fetch("/api/m").then(function(data){return data.json();}).then(function(res){var temp_media=[];for(var i=0;i<res.length;i++){temp_media.push({file:res[i],src_file:"".concat(res[i].filePath,"/").concat(res[i].hashFilename),thumb:"".concat(res[i].filePath,"/thumbnails/").concat(res[i].thumbnailFilename)});}_this2.setState({media:temp_media});});//get our tags list
fetch("/api/t").then(function(data){return data.json();}).then(function(res){return _this2.setState({tags:res});});}},{key:"handleHeaderBtnClick",value:function handleHeaderBtnClick(name){switch(name){case'ablums':break;case'tags':this.setState(function(prevState){return{show_tags:!prevState.show_tags};});break;case'upload':this.setState(function(prevState){return{show_albums:false,show_upload:!prevState.show_upload};});break;}}},{key:"handleCloseClick",value:function handleCloseClick(){this.setState(function(prevState){return{zoomed_image:{},is_image_focused:!prevState.is_image_focused};});}},{key:"handleImageClick",value:function handleImageClick(image){this.setState(function(prevState){return{zoomed_image:image,is_image_focused:!prevState.is_image_focused};});}},{key:"render",value:function render(){var _this3=this;var contStyle={display:"flex",flexFlow:"row wrap",alignItems:"flex-start"};var pageStyle={height:"100%",marginLeft:"1em",marginRight:"1em"};return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{id:"content",style:contStyle},this.state.is_image_focused&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_media_zoom_component__["a" /* default */],{image_source:this.state.zoomed_image,onCloseClick:function onCloseClick(){return _this3.handleCloseClick();}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_header_component__["a" /* default */],{isAuthenticated:this.props.isAuthenticated,onBtnClick:function onBtnClick(name){return _this3.handleHeaderBtnClick(name);}}),this.state.show_tags&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_tags_component__["a" /* default */],{tags:this.state.tags}),this.state.media&&!this.state.show_upload&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:pageStyle},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2",null,"Recent Media"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_image_tiles_list_component__["a" /* default */],{media:this.state.media,onImageClick:function onImageClick(image){return _this3.handleImageClick(image);}})),this.state.show_upload&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_upload_component__["a" /* default */],{tags:this.state.tags}));}}]);return UserHomeContainer;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageTilesList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_tile_component__ = __webpack_require__(49);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}var ImageTilesList=/*#__PURE__*/function(_React$Component){_inherits(ImageTilesList,_React$Component);function ImageTilesList(){_classCallCheck(this,ImageTilesList);return _possibleConstructorReturn(this,_getPrototypeOf(ImageTilesList).apply(this,arguments));}_createClass(ImageTilesList,[{key:"handleImageClick",value:function handleImageClick(media){this.props.onImageClick(media);}},{key:"render",value:function render(){var _this=this;var contStyle={display:"flex",flexFlow:"row wrap",justifyContent:"flex-start"};return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:contStyle},this.props.media.map(function(media){//const imgSrc = `${media.filePath}/thumbnails/${media.thumbnailFilename}`
return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__image_tile_component__["a" /* default */],{key:media.file.id,media:media,onImageClick:function onImageClick(image){return _this.handleImageClick(image);}});}));}}]);return ImageTilesList;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageTile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}var ImageTile=/*#__PURE__*/function(_React$PureComponent){_inherits(ImageTile,_React$PureComponent);function ImageTile(){_classCallCheck(this,ImageTile);return _possibleConstructorReturn(this,_getPrototypeOf(ImageTile).apply(this,arguments));}_createClass(ImageTile,[{key:"handleImageClick",value:function handleImageClick(media){this.props.onImageClick(media);}},{key:"render",value:function render(){var _this=this;/*const contStyle = {
            display: "inline-block",
            marginRight: "1em",
            marginBottom: "1em"
        };*/var contStyle={display:"flex",alignItems:"center",justifyContent:"center",marginRight:"1em",marginBottom:"1em",width:"12.5em",height:"12.5em",overflow:"hidden"};var imgStyle={flex:"1 1 auto",maxWidth:"12.5em",maxHeight:"12.5em",objectFit:"contain"//necessary?
};var imgSrc=this.props.media.thumb;var filename=this.props.media.file.originalFilename;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:contStyle,className:"tile-bg",onClick:function onClick(){return _this.handleImageClick(_this.props.media);}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{style:imgStyle,src:imgSrc,alt:filename}));}}]);return ImageTile;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaZoom; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}//get image_source, onCloseClick
var MediaZoom=/*#__PURE__*/function(_React$Component){_inherits(MediaZoom,_React$Component);function MediaZoom(){_classCallCheck(this,MediaZoom);return _possibleConstructorReturn(this,_getPrototypeOf(MediaZoom).apply(this,arguments));}_createClass(MediaZoom,[{key:"handleCloseClick",value:function handleCloseClick(){this.props.onCloseClick();}},{key:"render",value:function render(){var _this=this;var contStyle={position:"absolute",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",top:"0px",left:"0px",bottom:"0px",right:"0px",background:"rgba(15, 15, 15, 0.98)",color:"#f5f5f5",zIndex:"500",padding:"70px"};var imgStyle={maxWidth:"100%",maxHeight:"100%",boxShadow:"0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.2)"};var vidStyle={maxWidth:"100%",maxHeight:"100%",boxShadow:"0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.2)"};var spanStyle={paddingTop:"1em",fontSize:"1.5em"};console.log(this.props.image_source);//this gets in a type as props.image_source.file.type
//type is either "image" or "video"
//can use that to determine whether to show image 
//or video here in the zoomed viewer
var filename=this.props.image_source.file.originalFilename;var isVideo=this.props.image_source.file.type==="video";return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:contStyle},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"expand_close",onClick:function onClick(){return _this.handleCloseClick();}}),!isVideo&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{style:imgStyle,src:this.props.image_source.src_file,alt:filename}),isVideo&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("video",{style:vidStyle,autoplay:true,loop:true,controls:true},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("source",{src:this.props.image_source.src_file})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{style:spanStyle},filename));}}]);return MediaZoom;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadMedia; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tags_selectable_list_component__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__upload_image_tiles_list_component__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__upload_image_details_component__ = __webpack_require__(56);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}var UploadMedia=/*#__PURE__*/function(_React$Component){_inherits(UploadMedia,_React$Component);function UploadMedia(props){var _this;_classCallCheck(this,UploadMedia);_this=_possibleConstructorReturn(this,_getPrototypeOf(UploadMedia).call(this,props));_this.state={media:[],img_selected:null};_this.handleUploadInputChange=_this.handleUploadInputChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));return _this;}_createClass(UploadMedia,[{key:"handleCloseClick",value:function handleCloseClick(){this.setState({img_selected:null});}},{key:"handleImageClick",value:function handleImageClick(image){this.setState({img_selected:image});}},{key:"handleUploadInputChange",value:function handleUploadInputChange(e){var files=e.target.files;var temp_media=[];for(var i=0;i<files.length;i++){temp_media.push({file:files[i],url:URL.createObjectURL(files[i])});}this.setState({media:temp_media});}},{key:"render",value:function render(){var _this2=this;var contStyle={display:"flex",width:"100%",height:"100%"};var uploadColStyle={flex:"0 0 auto",overflow:"auto",background:"#1f1f1f",color:"#f5f5f5",height:"100%",maxWidth:"15em",paddingLeft:"1em"};var uploadImageTilesDivStyle={flex:"1 1 auto",margin:"0em 0em 2.5em 1em",overflow:"hidden",paddingTop:"1em"};return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:contStyle},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:uploadColStyle},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2",null,"Upload Media"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("form",{id:"upload-form",encType:"multipart/form-data"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("label",null,"Select files to upload:",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input",{type:"file",id:"upload",name:"upload[]",multiple:true,onChange:this.handleUploadInputChange}))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h3",null,"Tags:"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__tags_selectable_list_component__["a" /* default */],{tags:this.props.tags}))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:uploadImageTilesDivStyle},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__upload_image_tiles_list_component__["a" /* default */],{media:this.state.media,onImageClick:function onImageClick(image){return _this2.handleImageClick(image);}})),this.state.img_selected&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__upload_image_details_component__["a" /* default */],{media:this.state.img_selected,tags:this.props.tags,onCloseClick:function onCloseClick(){return _this2.handleCloseClick();}}));}}]);return UploadMedia;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagSelectable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}var TagSelectable=/*#__PURE__*/function(_React$Component){_inherits(TagSelectable,_React$Component);function TagSelectable(){_classCallCheck(this,TagSelectable);return _possibleConstructorReturn(this,_getPrototypeOf(TagSelectable).apply(this,arguments));}_createClass(TagSelectable,[{key:"render",value:function render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("label",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input",{type:"checkbox"}),this.props.description));}}]);return TagSelectable;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadImageTilesList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__upload_image_tile_component__ = __webpack_require__(54);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}var _require=__webpack_require__(55),AutoSizer=_require.AutoSizer,List=_require.List;var uuid=__webpack_require__(8);var UploadImageTilesList=/*#__PURE__*/function(_React$Component){_inherits(UploadImageTilesList,_React$Component);function UploadImageTilesList(){_classCallCheck(this,UploadImageTilesList);return _possibleConstructorReturn(this,_getPrototypeOf(UploadImageTilesList).apply(this,arguments));}_createClass(UploadImageTilesList,[{key:"handleImageClick",value:function handleImageClick(media){this.props.onImageClick(media);}},{key:"render",value:function render(){var _this=this;var items_count=this.props.media.length;var item_size=200;var contStyle={display:"flex",flexFlow:"row wrap",justifyContent:"flex-start",paddingTop:"1em",maxHeight:"100%",overflowY:"auto"};var listStyle={outline:"none"};return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AutoSizer,null,function(_ref){var height=_ref.height,width=_ref.width;var itemsPerRow=Math.floor(width/item_size);var rowCount=Math.ceil(items_count/itemsPerRow);return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(List,{width:width,height:height,rowCount:rowCount,rowHeight:item_size+16,style:listStyle,rowRenderer:function rowRenderer(_ref2){var index=_ref2.index,key=_ref2.key,style=_ref2.style;var items=[];var fromIndex=index*itemsPerRow;var toIndex=Math.min(fromIndex+itemsPerRow,items_count);var _loop=function _loop(i){var media=_this.props.media[i];items.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__upload_image_tile_component__["a" /* default */],{key:uuid(),imgSrc:media.url,filename:media.file.name,onImageClick:function onImageClick(){return _this.handleImageClick({media:media,src:media.url});}}));};for(var i=fromIndex;i<toIndex;i++){_loop(i);}return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{key:key,style:Object.assign({},style,{display:"flex"})},items);}});});return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:contStyle,onScroll:function onScroll(){return _this.handleScroll();}});}}]);return UploadImageTilesList;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadImageTile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}//import ReactDOM from 'react-dom';
var UploadImageTile=/*#__PURE__*/function(_React$PureComponent){_inherits(UploadImageTile,_React$PureComponent);function UploadImageTile(){_classCallCheck(this,UploadImageTile);return _possibleConstructorReturn(this,_getPrototypeOf(UploadImageTile).apply(this,arguments));}_createClass(UploadImageTile,[{key:"handleImageClick",value:function handleImageClick(){this.props.onImageClick();}},{key:"render",value:function render(){var _this=this;var contStyle={display:"flex",alignItems:"center",justifyContent:"center",marginRight:"1em",marginBottom:"1em",width:"12.5em",height:"12.5em",overflow:"hidden",background:"#ebebeb"};var imgStyle={flex:"0 1 auto",maxWidth:"12.5em",maxHeight:"12.5em"//nope!        
};return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:contStyle,onClick:function onClick(){return _this.handleImageClick();}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{style:imgStyle,src:this.props.imgSrc,alt:this.props.filename}));}}]);return UploadImageTile;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("react-virtualized");

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadImageDetails; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tags_selectable_list_component__ = __webpack_require__(7);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}var UploadImageDetails=/*#__PURE__*/function(_React$Component){_inherits(UploadImageDetails,_React$Component);function UploadImageDetails(props){var _this;_classCallCheck(this,UploadImageDetails);_this=_possibleConstructorReturn(this,_getPrototypeOf(UploadImageDetails).call(this,props));_this.state={width:0,height:0};_this.imgRef=__WEBPACK_IMPORTED_MODULE_0_react___default.a.createRef();return _this;}_createClass(UploadImageDetails,[{key:"componentDidMount",value:function componentDidMount(){this.setState({width:this.imgRef.current.naturalWidth,height:this.imgRef.current.naturalHeight});}},{key:"componentDidUpdate",value:function componentDidUpdate(){var width=this.imgRef.current.naturalWidth;var height=this.imgRef.current.naturalHeight;if(this.state.width!==width||this.state.height!==height){this.setState({width:this.imgRef.current.naturalWidth,height:this.imgRef.current.naturalHeight});}}},{key:"handleCloseClick",value:function handleCloseClick(){this.props.onCloseClick();}},{key:"render",value:function render(){var _this2=this;var contStyle={flex:"0 0 auto",display:"flex",flexDirection:"column",width:"50%",background:"#1f1f1f",color:"#f5f5f5",padding:"1em"};var closeStyle={position:"relative",top:"0px",right:"0px",alignSelf:"flex-end",marginBottom:"1em"};var imgStyle={maxHeight:"50%",objectFit:"contain"};var detailsHeaderStyle={color:"#666666"};var detailsStyle={float:"right"};var media=this.props.media;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:contStyle},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"expand_close",style:closeStyle,onClick:function onClick(){return _this2.handleCloseClick();}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{ref:this.imgRef,src:media.src,style:imgStyle,alt:media.media.file.name}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{style:detailsHeaderStyle},"Filename:"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{style:detailsStyle},media.media.file.name),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{style:detailsHeaderStyle},"Dimensions:"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{style:detailsStyle},this.state.width," x ",this.state.height)),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h3",null,"Tags assigned to this media item:"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__tags_selectable_list_component__["a" /* default */],{tags:this.props.tags}));}}]);return UploadImageDetails;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tags; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}var Tags=/*#__PURE__*/function(_React$Component){_inherits(Tags,_React$Component);function Tags(){_classCallCheck(this,Tags);return _possibleConstructorReturn(this,_getPrototypeOf(Tags).apply(this,arguments));}_createClass(Tags,[{key:"render",value:function render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,"Tags");}}]);return Tags;}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("express-mysql-session");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map