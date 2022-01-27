const Controller = require ('../controllers')
const express = require('express')
const router = express.Router()
const login = require('./login.js')
const portfolio = require('./portfolio.js')
const stocks = require('./stocks.js')



router.get ('/', Controller.main)

router.get ('/register', Controller.formSignup)
router.post ('/register', Controller.signup)
router.get ('/login', Controller.loginForm)
router.post ('/login', Controller.login)


router.use(function (req, res, next) {
  if (req.session.UserId) {
    next()
  } else {
    res.redirect('/login?error=Need Login')
  }
})
router.get('/logout', Controller.logout)


router.get ('/profile', Controller.profile)
router.post ('/profile', Controller.topUp)
router.use ('/portfolio', portfolio)
router.use ('/stocks', stocks)

router.get ('/companies', Controller.listCompany)

router.use(function (req, res, next) {
  if (req.session.isAdmin) {
    next()
  } else {
    res.redirect('/login?error=Need to be Admin')
  }
})
// router.use ('/admin', admin)

module.exports = router