const db = require('../database')
const model = require('../model/model')
const loginController = require('../controllers/loginController')


let getIndexPage = (req, res) => {
    posts = model.getAllPosts( posts => {
        console.log(req.user)
        let myId
        if(req.user){
            myId = req.user.id
        }
        console.log('myId: ', myId)
        return res.render('index', {
            isLoggedIn: req.isLoggedIn,
            h: 'hello',
            posts,
            myId
        })

        
    })
}

module.exports = {
    getIndexPage: getIndexPage
}