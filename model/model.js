const db = require('../database')
module.exports = {
    getall: (d)=>{
        let q = 'SELECT * FROM users'
        db.query(q, (err, data) => {
            if (err) throw err
            return d(data)
        })
    },
    doesUserExist: (username, callback)=>{
        let q = `SELECT email FROM users WHERE email = '${username}'`
        db.query(q, (err, data)=>{
            if (err) {
                console.log(err)
            }
            console.log(data)
            return callback(data.length != 0)
        })
    }
}