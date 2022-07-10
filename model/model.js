const db = require('../database')
module.exports = {
    getall: (d)=>{
        let q = 'SELECT * FROM users'
        db.query(q, (err, data) => {
            if (err) throw err
            return d(data)
        })
    }
}