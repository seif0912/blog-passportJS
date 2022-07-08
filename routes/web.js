const express = require('express')
const loginController = require('../controllers/loginController')


let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        return res.send('<h1>hello world</h1>')
    })
    router.get('/login', loginController.getLoginPage)
    return app.use("/", router)
}

router.get('/', (req, res) => {
    console.log('initwebroutes')
    res.send('<h1>hello world</h1>')
})
module.exports = initWebRoutes