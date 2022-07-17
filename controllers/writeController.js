const model = require('../model/model')

let getWritePage = (req, res) => {
    return res.render('write', {name: req.user.name})
}

let write = (req, res) => {
    let data = {
        id: req.user.id,
        title: req.body.title,
        body: req.body.body
    }
    model.write(data, (e)=>{
        if(e){
            console.log(e,'e')
        }
        res.redirect('/')
    })
}

module.exports = {
    getWritePage,
    write
}
