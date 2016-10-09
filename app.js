
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, mysql= require('./routes/mysql')
, signup= require('./routes/signup')
, profile=require('./routes/profile')
, product=require('./routes/product')
,getAllUser=require('./routes/getAllUser')
,session = require('express-session');




var login = require("./routes/login");
var itin=require("./routes/itin");
var myaction=require("./routes/myaction");

var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(session({
	secret: 'kotia_just_chill',
	resave: true,
	saveUninitialized: true
}));
//app.use(express.session({
//	  store : MemoryStore,
//	  secret: 'random_string_goes_here',
//	  duration: 60 * 1000
//}));
/*app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));*/

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

//GET Requests
app.get('/', routes.index);
app.get('/homepage',routes.redirectToHomepage);
app.get('/signup',routes.signup);
app.get('/login',routes.login);
app.get('/profile', routes.profile);
app.get('/product',product.display);
app.get('/getAllUser',routes.getUser);
app.get('/test',getAllUser.getUser);
//app.get('/profile',routes.profile);
app.get('/logout', routes.logout);



//POST Requests
app.post('/checkSignup',signup.checkSignup);
app.post('/checkLogin', login.checkLogin);
app.post('/products',product.sell);
app.post('/setProfile',profile.setProfile)
//app.post('/logout', login.logout);

//connect to the mongo collection session and then createServer
/*mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);*/
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
//});