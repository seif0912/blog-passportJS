require('dotenv').config()
const express = require('express')
const app = express()
const initWebRoutes = require('./routes/web')
const passport = require('passport')
const session = require('express-session')
const connectFlash = require('connect-flash')
const cookieParser = require('cookie-parser')

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.use(express.static('public'));


app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

initWebRoutes(app)


let port = process.env.PORT || 3000
app.listen(port, ()=>console.log('listening...'))