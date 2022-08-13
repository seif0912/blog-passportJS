/*
connect to mysql database & export the connection 
*/
const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
})

conn.connect((err)=>{
    if (err) {
        console.error(err)
    }
    console.log('DB id connected')
})

module.exports = conn