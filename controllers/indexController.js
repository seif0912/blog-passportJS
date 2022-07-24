const db = require('../database')
const model = require('../model/model')
const loginController = require('../controllers/loginController')


let getIndexPage = (req, res) => {
    posts = model.getAllPosts( posts => {
        console.log(req.user)
        let myId
        let myName
        if(req.user){
            myId = req.user.id
            myName = req.user.name
        }
        console.log('myId: ', myId)
        return res.render('index', {
            isLoggedIn: req.isLoggedIn,
            h: 'hello',
            posts,
            myId,
            myName
        })

        
    })
}

module.exports = {
    getIndexPage: getIndexPage
}