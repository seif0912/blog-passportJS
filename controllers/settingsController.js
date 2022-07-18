const model = require('../model/model')

const getSettingsPage = (req, res) =>{
    res.render('settings', {userId: req.user.id, isLoggedIn: req.isLoggedIn})
}

module.exports = {
    getSettingsPage
}