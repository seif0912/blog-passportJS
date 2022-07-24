const model = require('../model/model')

let getProfilePage = (req, res) => {
    let myId
    let myName
        if(req.user){
            myId = req.user.id
            myName = req.user.name
        }
    console.log(req.params.id)

    model.doesUserExist(req.params.id, ex =>{
        if(ex){
            model.getProfile(req.params.id, profileData => {
                console.log(profileData)
                model.getProfilePosts(req.params.id, posts => {
                    console.log(profileData[0])
                    return res.render('profile', {
                        isLoggedIn: req.isLoggedIn,
                        userId: req.params.id,
                        profileData: profileData[0],
                        posts,
                        myId,
                        myName
                    })
                    
                })
            })
        }else{
            return res.status(404).redirect('/404')
        }
    })
}

module.exports = {
    getProfilePage
}