const Controller = require ('../controllers')
const express = require('express')
const router = express.Router()

router.get ('/', Controller.main)// LIST STOCK
router.get ('/add', Controller.main)// FORM ADD STOCK
router.get ('/add', Controller.main)// ADD STOCK
router.get ('/:StockId/edit', Controller.main)// EDIT STOCK FORM 
router.post ('/:StockId/edit', Controller.main)// UPDATE STOCK EDIT
router.get ('/:StockId/delete', Controller.main)// DELETE STOCK

module.exports = router