// require('dotenv').config()
const express = require('express')
const initWebRoutes = require('./routes/web')
// const rt = require('./routes/web')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')

initWebRoutes(app)

app.listen(3000, ()=>console.log('listening...'))