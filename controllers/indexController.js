const db = require('../database')
const model = require('../model/model')
const loginController = require('../controllers/loginController')


let getIndexPage = (req, res) => {
    posts = model.getAllPosts( posts => {
        console.log(req.user)
        let userId
        if(req.user){
            userId = req.user.id
        }
        console.log('userId: ', userId)
        return res.render('index', {
            isLoggedIn: req.isLoggedIn,
            h: 'hello',
            posts,
            userId
        })

        
    })
}

module.exports = {
    getIndexPage: getIndexPage
}