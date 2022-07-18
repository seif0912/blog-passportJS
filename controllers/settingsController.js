const model = require('../model/model')

const getSettingsPage = (req, res) =>{
    res.render('settings')
}

module.exports = {
    getSettingsPage
}