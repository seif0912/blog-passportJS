const db = require('../database')
const model = require('../model/model')
const bcrypt = require('bcrypt')


let getRegisterPage = (req, res) => {
    return res.render('register', {exist:false})
}


let register = (req, res) => {
    model.doesUserExist(req.body.email, (exist) => {
        if(exist){
            res.statusCode = 409
            res.render('register', {exist})
            return
        }
        model.createNewUser(req.body, (e)=>{
            return res.redirect('/login')
        })
    })
}

module.exports = {
    getRegisterPage,
    register
}