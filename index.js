const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view_helpers')(app);
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// persistence storage of session cookies in database
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

// set up chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat Server is listening on port 5000');
const path = require('path');
 
if(env.name == 'development'){
app.use(sassMiddleware({
    src: path.join(__dirname,env.aseet_path,'scss'),
    dest: path.join(__dirname,env.aseet_path,'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))
}

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.aseet_path));
//make upload path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(logger(env.morgan.mode,env.morgan.options));

app.use(expressLayouts);

// Extract css and javascript in layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// set up view engine and vie folder
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in db
app.use(session({
    name: 'codial',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
        return;
    }
    console.log('Express is running on port:',port);
    return;
});