const model = require('../model/model')
const loginService = require('../services/loginService')

const getSettingsPage = (req, res) =>{
    res.render('settings', {userId: req.user.id, isLoggedIn: req.isLoggedIn})
}

const updateName = async(req, res) => {
    let match = await loginService.comparePassword(req.body.password, req.user);
    if(match === true){
        model.updateName({name: req.body.name, id: req.user.id})
        return res.status(201).send({nameUpdated: true})
    }else{
        return res.status(401).send({nameUpdated: false})
    }
}

const updatePassword = async(req, res) => {
    let match = await loginService.comparePassword(req.body.oldPassword, req.user);
    if(match === true){
        
        model.updatePassword({newPassword: req.body.newPassword, id: req.user.id})
        return res.status(201).send({passwordUpdated: true})
    }else{
        return res.status(401).send({passwordUpdated: false})
    }
}

module.exports = {
    getSettingsPage,
    updateName,
    updatePassword
}