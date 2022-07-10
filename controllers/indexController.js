const db = require('../database')
const model = require('../model/model')



let getIndexPage = (req, res) => {
    model.getall((data) => {
        console.log(data)
        return res.render('index', {data})
    })
}

module.exports = {
    getIndexPage: getIndexPage
}