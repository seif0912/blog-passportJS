const model = require('../model/model')
const loginService = require('../services/loginService')

const getSettingsPage = (req, res) =>{
    res.render('settings', {myId: req.user.id, isLoggedIn: req.isLoggedIn})
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

const updatePassword = async (req, res) => {
    let match = await loginService.comparePassword(req.body.oldPassword, req.user);
    if(match === true){
        model.updatePassword({newPassword: req.body.newPassword, id: req.user.id})
        return res.status(201).send({passwordUpdated: true})
    }else{
        return res.status(401).send({passwordUpdated: false})
    }
}

const deleteAccount = async (req, res)=>{
    let match = await loginService.comparePassword(req.body.password, req.user)
    console.log('match: ', match)
    if (match === true){
        console.log('deeee')
        model.deleteAccount(req.user.id, (e) =>{
            console.log('e: ',e)
        })
        req.session.destroy( err => {
            return res.redirect("/");
        })
    }
}

module.exports = {
    getSettingsPage,
    updateName,
    updatePassword,
    deleteAccount
}