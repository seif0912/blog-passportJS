const db = require('../database')
const model = require('../model/model')


let getRegisterPage = (req, res) => {
    return res.render('register', {exist:false})
}


let register = (req, res) => {

    let un = req.body.username
    console.log(un)
    model.doesUserExist(un, (exist) => {
        if(exist){
            res.statusCode = 409
            res.render('register', {exist})
        }
    })
    console.log('register!')
    // res.redirect('/')
}

module.exports = {
    getRegisterPage,
    register
}