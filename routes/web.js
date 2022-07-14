const express = require('express')
const loginController = require('../controllers/loginController')
const indexController = require('../controllers/indexController')
const registerController = require('../controllers/registerController')
const passport = require('passport')
const initPassportLocal = require("../controllers/passportLocalController")

// Init all passport
initPassportLocal();
let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', loginController.checkLoggedIn, indexController.getIndexPage)
    router.get('/login', loginController.checkLoggedOut, loginController.getLoginPage)
    router.get('/register', registerController.getRegisterPage)


    router.post('/register', registerController.register)
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true
    }))
    router.post("/logout", loginController.postLogOut);
    return app.use("/", router)
}
module.exports = initWebRoutes