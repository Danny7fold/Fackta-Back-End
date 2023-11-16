
const express = require('express')
const app = express()
const sessions = require("client-sessions");
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const dotenv = require("dotenv")
dotenv.config()
const AppRoutes = require('./appRoutes');
const cors = require('cors')
const bodyParser = require('body-parser')
const {
    env: { PORT, SESSION_SECRET_LETTER },
  } = process


//express middlewares
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)



//client session
app.use(
    sessions({
      cookieName: 'session',
      secret: SESSION_SECRET_LETTER,
      duration: 24*24 * 60 * 60 * 1000,
      activeDuration:  24*24 * 60 * 60 * 1000,
    })
  )
app.use(cookieParser())


//cors
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  }));


  // App routes
AppRoutes(app)



app.listen(PORT, ()=>{
    console.log('Server Started , Port ', PORT)
})