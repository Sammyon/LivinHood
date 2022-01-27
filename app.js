const express = require('express')
const app = express()
const route = require('./routes')
const port = 3000
const session = require('express-session')


app.set ('view engine', 'ejs')
app.use (express.urlencoded({extended: false}))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false ,
    sameSite: true
  }
}))

app.use('/', route)
// app.get ('/', Controller.main)

app.listen(port, () => {
  console.log(`Listening to port ${port}!`);
})