const model = require('../model/model');

const getPost = (req, res) => {
    model.getPost(req.params.id, post => {
        post[0].body = post[0].body.split('\r\n')
        // console.log(req.isLoggedIn)
        let myId
        if(req.user){
            myId = req.user.id
        }
        return res.render('post', {isLoggedIn: req.isLoggedIn, post: post[0], myId})
    })
}

const like = (req, res) => {
    console.log(req.user)
    console.log(req.body)
    let data = {
        userName: req.user.name,
        postName: '',
        userId: req.user.id,
        postId: req.body.postId
    }
    model.like(data, e => {
        if (e) {
            console.log(e)
        }
        // return res.statusCode(200)
    })
}

module.exports = {
    getPost,
    like
}