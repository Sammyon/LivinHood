const Controller = require ('../controllers')
const express = require('express')
const router = express.Router()
const session = require('express-session')
const admin = require('./admin.js')
const user = require('./user.js')
const login = require('./login.js')



router.get ('/', Controller.main)
router.get ('/register', Controller.formSignup)
router.post ('/register', Controller.signup)
router.get ('/login', Controller.loginForm)
router.post ('/login', Controller.login)

router.use(function (req, res, next) {
  if (req.session.UserId) {
    console.log(req.session)
    next()
  } else {
    res.redirect('/login?error=Need Login')
  }
})




// router.get ('/login', login) //LOGIN
router.use ('/user', user)
router.get ('/profile', Controller.profile)
router.get ('/portfolio', Controller.listPortfolio)
router.get ('/companies', Controller.listCompany)
router.get ('/stock', Controller.listStock)

router.use(function (req, res, next) {
  if (req.session.isAdmin) {
    console.log("masuk ke admin")
    next()
  } else {
    res.redirect('/login?error=Need to be Admin')
  }
})
router.use ('/admin', admin)

module.exports = router