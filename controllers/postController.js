const model = require('../model/model');

const getPost = (req, res) => {
    model.doesPostExist(req.params.id, ex =>{
        if(ex){
            model.getPost(req.params.id, post => {
                post[0].body = post[0].body.split('\r\n')
                // console.log(req.isLoggedIn)
                let myId
                if(req.user){
                    myId = req.user.id
                }
                return res.render('post', {isLoggedIn: req.isLoggedIn, post: post[0], myId})
            })
        }else{
            res.status(404).redirect('/404')
        }
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

let getPostLikes = (req, res) => {
    model.getPostLikes(req.body.postId, (r)=>{
        console.log('res: ', r)
        return res.send({likes: r})
    })
}

let isLiked = (req, res)=>{
    model.isLiked({post_id: req.body.postId, userId: req.user.id}, (r)=>{
        return res.send({isLiked: r})
    })
}

module.exports = {
    getPost,
    like,
    getPostLikes,
    isLiked
}