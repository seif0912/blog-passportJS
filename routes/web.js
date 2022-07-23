const express = require('express')
const loginController = require('../controllers/loginController')
const indexController = require('../controllers/indexController')
const registerController = require('../controllers/registerController')
const writeController = require('../controllers/writeController')
const postController = require('../controllers/postController')
const profileController = require('../controllers/profileController')
const settingsController = require('../controllers/settingsController')
const get404Controller = require('../controllers/404Controller')
const notAuthorizedController = require('../controllers/notAuthorizedController')
const passport = require('passport')
const initPassportLocal = require("../controllers/passportLocalController")

// Init all passport
initPassportLocal();
let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', loginController.isLoggedIn, indexController.getIndexPage)
    router.get('/login', loginController.checkLoggedOut, loginController.getLoginPage)
    router.get('/register',loginController.checkLoggedOut, registerController.getRegisterPage)
    router.get('/write',loginController.checkLoggedIn, writeController.getWritePage)
    router.get('/not-authorized', loginController.isLoggedIn, notAuthorizedController.getNApage)
    router.get('/post/:id', loginController.isLoggedIn, postController.getPost)
    router.get('/profile/:id', loginController.isLoggedIn, profileController.getProfilePage)
    router.get('/profile/:id/settings', loginController.checkLoggedIn, loginController.isAuthorized, settingsController.getSettingsPage)
    

    router.post('/register', registerController.register)
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true
    }))
    router.post("/logout", loginController.postLogOut);

    router.post('/write', loginController.checkLoggedIn, writeController.write)
    router.post('/update-name', loginController.checkLoggedIn, settingsController.updateName)
    router.post('/update-password', loginController.checkLoggedIn, settingsController.updatePassword)
    router.post('/delete-account', loginController.checkLoggedIn, settingsController.deleteAccount)
    router.post('/like', loginController.checkLoggedIn, postController.like)
    router.post('/get-post-likes', loginController.checkLoggedIn, postController.getPostLikes)
    router.post('/is-liked', loginController.checkLoggedIn, postController.isLiked)
    router.post('/delete-post', loginController.checkLoggedIn, postController.deletePost)


    router.get('*',loginController.isLoggedIn, get404Controller.get404Page);
    return app.use("/", router)
}
module.exports = initWebRoutes