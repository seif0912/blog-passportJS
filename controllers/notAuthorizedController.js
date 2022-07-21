
let getNApage = (req, res) => {
    let myId
    if (req.user){
        myId = req.user.id
    }
    res.render('not-authorized',{
        isLoggedIn: req.isLoggedIn,
        myId
    })
}

module.exports = {
    getNApage
}