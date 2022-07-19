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
        let q = `
        SELECT u.name, p.post_id, p.title, p.body, p.shared_at, p.likes
        FROM posts AS p
        LEFT JOIN users as u
        ON (u.id = p.user_id)
        ORDER BY p.shared_at DESC`
        db.query(q, (err, data) => {
            if (err) throw err
            return d(data)
        })
    },
    getPost: (id, callback) => {
        let q = `
        SELECT u.name, u.id, p.post_id, p.title, p.body, p.shared_at, p.likes
        FROM posts AS p
        LEFT JOIN users as u
        ON (u.id = p.user_id)
        WHERE p.post_id = ?
        ORDER BY p.shared_at DESC`
        db.query(q, [id],(err, data) => {
            if (err) throw err
            return callback(data)
        })
    },
    getProfilePosts: (id, callback) => {
        let q = `
        SELECT p.post_id, p.title, p.body, p.shared_at, p.likes
        FROM posts AS p
        LEFT JOIN users as u
        ON (u.id = p.user_id)
        WHERE u.id = ?
        ORDER BY p.shared_at DESC`
        db.query(q, [id],(err, data) => {
            if (err) throw err
            return callback(data)
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
            db.query(q, [data.email, hashedPass, data.name], (err)=>{
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
    },
    getProfile: (id, callback) => {
        let q = `
        SELECT u.name, count(p.post_id) AS total_posts, sum(p.likes) AS total_likes
        FROM posts AS p
        LEFT JOIN users as u
        ON (u.id = p.user_id)
        WHERE u.id = ?
        `
        db.query(q, [id],(err, data) => {
            if (err) throw err
            return callback(data)
        })
    },
    updateName: async (data) => {
        let q = `
        UPDATE users
        SET name = ?
        WHERE id = ?`
        db.query(q, [data.name, data.id],(err, data) => {
            if (err) throw err
        })
    },
    updatePassword: async (data) => {
        let q = `
        UPDATE users
        SET password = ?
        WHERE id = ?`
        let newHashedPassword = await bcrypt.hash(data.newPassword, 10) 
        db.query(q, [newHashedPassword, data.id],(err, data) => {
            if (err) throw err
        })
    },
    deleteAccount: (id, callback)=>{
        let q = `
        DELETE FROM users
        WHERE id = ?`
        db.query(q, [id], (err, data) => {
            if(err) throw err
            return callback(data)
        })
    }
}