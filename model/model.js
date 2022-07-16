const db = require('../database')
const bcrypt = require('bcrypt')
module.exports = {
    getAllUsers: (d)=>{
        let q = 'SELECT * FROM users'
        db.query(q, (err, data) => {
            if (err) throw err
            return d(data)
        })
    },
    getAllPosts: (d) => {
        let q = 'SELECT * FROM posts'
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
    },
    createNewUser: async (data, callback) => {
        try {
            const hashedPass = await bcrypt.hash(data.password, 10)
            let q = 'INSERT INTO users(email, password, name) VALUES(?,?,?)'
            // console.log(data, '====')
            db.query(q, [data.username, hashedPass, data.name], (err)=>{
                if (err) throw err
                return callback(data)
            })
            
        } catch (err) {
            console.error(err)
        }
    },
    write: (data, callback) => {
        let q = 'INSERT INTO posts(user_id, title, body) VALUES(?,?,?)'
        // console.log(data, '====')
        db.query(q, [data.id, data.title, data.body], (err)=>{
            if (err) throw err
            return callback(data)
        })
    }
}