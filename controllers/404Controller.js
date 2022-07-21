
let get404Page = (req, res) => {
    let myId
    if(req.user){
        myId = req.user.id
    }
    return res.render('404', {
        isLoggedIn: req.isLoggedIn,
        myId
    })

        
}

module.exports = {
    get404Page
}