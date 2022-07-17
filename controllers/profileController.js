const model = require('../model/model')

let getProfilePage = (req, res) => {
    model.getProfile(req.params.id, profileData => {
        model.getProfilePosts(req.params.id, posts => {
            console.log(profileData[0])
            return res.render('profile', {
                isLoggedIn: req.isLoggedIn,
                userId: req.params.id,
                profileData: profileData[0],
                posts
            })
            
        })
    })
}

module.exports = {
    getProfilePage
}