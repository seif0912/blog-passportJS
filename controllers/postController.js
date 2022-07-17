const model = require('../model/model');

const getPost = (req, res) => {
    model.getPost(req.params.id, post => {
        post[0].body = post[0].body.split('\r\n')
        // console.log(req.isLoggedIn)
        return res.render('post', {isLoggedIn: req.isLoggedIn, post: post[0], userId: req.params.id })
    })
}

module.exports = {
    getPost
}