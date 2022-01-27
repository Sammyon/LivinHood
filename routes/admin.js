const Controller = require ('../controllers')
const express = require('express')
const router = express.Router()
const company = require('./companies.js')
const stock = require('./stocks.js')

// router.use ('/company', portfolio)

router.get ('/', Controller.main)// LIST ADMIN
router.get ('/add', Controller.main)// ADD NEW ADMIN
router.post ('/add', Controller.main)// SUBMIT NEW ADMIN 
router.get ('/:AdminId', Controller.main)// CHOOSE ADMIN
router.use ('/:AdminId/companies', company)
router.use ('/:AdminId/stocks', stock)

module.exports = router