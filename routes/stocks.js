const Controller = require ('../controllers')
const express = require('express')
const router = express.Router()

router.get ('/', Controller.listStock)
router.get ('/:StockId/', Controller.stockById)
router.get ('/:StockId/buy', Controller.buy)
router.post ('/:StockId/buy', Controller.newPortfolio)
router.get ('/:StockId/sell', Controller.sell)
// router.get ('/:StockId/edit', Controller.main)// EDIT STOCK FORM 
// router.post ('/:StockId/edit', Controller.main)// UPDATE STOCK EDIT
// router.get ('/:StockId/delete', Controller.main)// DELETE STOCK

module.exports = router