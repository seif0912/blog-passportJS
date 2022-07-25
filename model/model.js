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
        SELECT u.name, p.post_id, p.title, p.body, p.shared_at, count(l.post_id) AS likes
        FROM posts AS p
        LEFT JOIN users as u
        ON (u.id = p.user_id)
        left JOIN likes AS l
        ON (p.post_id = l.post_id)
        group by p.post_id
        ORDER BY p.shared_at DESC`
        db.query(q, (err, data) => {
            if (err) throw err
            return d(data)
        })
    },
    getPost: (id, callback) => {
        let q = `

        SELECT u.name, u.id, p.post_id, p.title, p.body, p.shared_at, count(l.post_id) AS likes
        FROM posts AS p
        LEFT JOIN users as u
        ON (u.id = p.user_id)
        left JOIN likes AS l
        ON (p.post_id = l.post_id)
        WHERE p.post_id = ?`
        db.query(q, [id, id],(err, data) => {
            if (err) throw err
            return callback(data)
        })
    },
    deletePost: (id, callback) => {
        let q = `
        DELETE FROM posts
        WHERE post_id = ?`
        db.query(q, [id, id],(err, data) => {
            if (err) throw err
            return callback(data)
        })
    },
    getProfilePosts: (id, callback) => {
        let q = `
        SELECT p.post_id, p.title, p.body, p.shared_at, count(l.post_id) AS likes
        FROM posts AS p
        LEFT JOIN users as u
        ON (u.id = p.user_id)
        LEFT JOIN likes as l
        ON (p.post_id = l.post_id)
        WHERE u.id = ?
        group by p.post_id
        ORDER BY p.shared_at DESC`
        db.query(q, [id],(err, data) => {
            if (err) throw err
            return callback(data)
        })
    },
    doesEmailExist: (username, callback)=>{
        let q = `SELECT email FROM users WHERE email = ?`
        db.query(q,[username], (err, data)=>{
            if (err) {
                console.log(err)
            }
            return callback(data.length != 0)
        })
    },
    doesUserExist: (id, callback)=>{
        let q = `SELECT * FROM users WHERE id = ?`
        db.query(q,[id], (err, data)=>{
            if (err) {
                console.log(err)
            }
            return callback(data.length != 0)
        })
    },
    doesPostExist: (id, callback)=>{
        let q = `SELECT * FROM posts WHERE post_id = ?`
        db.query(q,[id], (err, data)=>{
            if (err) {
                console.log(err)
            }
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
        SELECT count(post_id) AS total_posts, sum(likes) AS total_likes, name
        FROM (
            SELECT u.name, p.post_id, count(l.post_id) AS likes
            FROM posts AS p
            LEFT JOIN users as u
            ON (u.id = p.user_id)
            LEFT JOIN likes as l
            ON (p.post_id = l.post_id)
            WHERE u.id = ?
            group by p.post_id
        ) AS total_posts
        `
        db.query(q, [id, id],(err, data) => {
            if (err) throw err
            console.log(data)
            if(data[0].total_posts == 0){
                console.log(000000)
                db.query('SELECT name FROM users WHERE id = ?', [id], (err, d) => {
                    console.log(d)

                    if (err) throw err
                    return callback(d)
                })
            }else{

                return callback(data)
            }
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
    },
    like: (data, callback) => {
        let check = `
        SELECT *
        FROM likes
        WHERE user_id = ? AND post_id = ?`
        db.query(check, [data.userId, data.postId], (err, rows) => {
            if (err){
                console.log(err)
            }
            if(rows.length == 0){
                let q = `
                INSERT INTO likes(user_name, user_id, post_id)
                VALUES(?,?,?)`
                db.query(q, [data.userName, data.userId, data.postId], (err, data) => {
                    if(err) throw err
                    return callback(data)
                })
            }else{
                let q = `
                DELETE FROM likes
                WHERE user_id = ? AND post_id = ?`
                db.query(q, [data.userId, data.postId], (err, data) => {
                    if(err) throw err
                    return callback(data)
                })
            }

        })
    },
    getPostLikes: (post_id, callback)=>{
        let q = `
        SELECT count(post_id) AS likes
        FROM likes
        WHERE post_id = ?`
        db.query(q, [post_id], (err, data) => {
            if (err) throw err
            return callback(data[0].likes)
        })
    },
    isLiked: (data, callback)=>{
        let q = `
        SELECT *
        FROM likes
        WHERE post_id = ? AND user_id = ?`
        db.query(q, [data.post_id, data.userId], (err, data) => {
            if (err) throw err
            return callback(data.length != 0)
        })
    }
}