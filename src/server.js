const express = require('express');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const hbs = require('hbs');

const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const session = require('express-session')
const path = require('path');



const http = require('http')
const port = process.env.PORT || 80 // setting the port
const app = express();
const server = http.createServer(app)

const { Like } = require('../route/like_socket')
Like(server)



// load config
const configFilePath = path.join(__dirname, "../config/config.env")
dotenv.config({ path: configFilePath })

// ---connect mongoDB
const ConnectDB = require('../config/conn')
ConnectDB();

// auth User
const { LoginAuth } = require('../config/auth')
LoginAuth(passport)
// -----Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set Static File
const static_path = path.join(__dirname, '../public')
app.use(express.static(static_path));

//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURI,
        dbName: 'signup',
    })
}))

// passport midleware
app.use(passport.initialize());
app.use(passport.session());

// set view engine
const { ShowLike } = require('../helper/hbs')
app.engine('hbs', exphbs({
    helpers: {
        ShowLike
    },

    defaultLayout: 'main', extname: 'hbs'
}))

// set partials file
const partials_path = path.join(__dirname, '../views/partials');
app.set('view engine', 'hbs');
hbs.registerPartials(partials_path);

app.use('/', require('../route/index'))
app.use('/like', require('../route/like_post_ajax'))

server.listen(port, () => {
    console.log(`server up and running port ${port}`);
});