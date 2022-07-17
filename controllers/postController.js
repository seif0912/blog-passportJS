

const getPost = (req, res) => {
    return res.render('post', {isLoggedIn: req.isLoggedIn})
}

module.exports = {
    getPost
}