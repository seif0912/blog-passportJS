const express = require('express')
const loginController = require('../controllers/loginController')
const indexController = require('../controllers/indexController')
const registerController = require('../controllers/registerController')


let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', indexController.getIndexPage)
    router.get('/login', loginController.getLoginPage)
    router.get('/register', registerController.getRegisterPage)


    router.post('/register', registerController.register)
    return app.use("/", router)
}
module.exports = initWebRoutes