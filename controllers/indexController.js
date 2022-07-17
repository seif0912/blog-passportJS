const db = require('../database')
const model = require('../model/model')
const loginController = require('../controllers/loginController')


let getIndexPage = (req, res) => {
    posts = model.getAllPosts( posts => {
        console.log(posts)
        return res.render('index', {
            isLoggedIn: req.isLoggedIn,
            h: 'hello',
            posts
        })

        
    })
}

module.exports = {
    getIndexPage: getIndexPage
}