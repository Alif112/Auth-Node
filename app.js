var express = require('express');

var app = express();
var multer = require('multer')
var constants = require('constants');
var constant = require('./config/constants');

var port = process.env.PORT || 8042;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var socket=require('socket.io');

var dateFormat = require('dateformat');
var now = new Date();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
//configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

var userinfo=require('./routes/userinfo');
var chat=require('./routes/chat');



require('./config/passport')(passport); // pass passport for configuration

//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

//view engine setup
var options = {
  maxAge: '1d',
};

app.use(express.static(path.join(__dirname, 'public')));
app.use('/userinfo', express.static(path.join(__dirname, 'public'), options));
app.use('/userinfo/basic', express.static(path.join(__dirname, 'public'), options));
app.use('/userinfo/data', express.static(path.join(__dirname, 'public'), options));
app.use('/userinfo/update', express.static(path.join(__dirname, 'public'), options));
app.use('/userinfo/delete', express.static(path.join(__dirname, 'public'), options));
app.use('/chat/enter', express.static(path.join(__dirname, 'public'), options));
app.use('/chat', express.static(path.join(__dirname, 'public'), options));


app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'ejs'); // set up ejs for templating


//required for passport
//app.use(session({ secret: 'iloveyoudear...' })); // session secret



app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
app.use('/userinfo', userinfo);
app.use('/chat', chat);

// app.use('/chat',chat);

require('./config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport



//launch ========================= =============================================
var server =app.listen(port,function(){});

var io=socket(server);
io.on('connection',function(socket){
    console.log("we are connected");
});

console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});
exports = module.exports = app;
