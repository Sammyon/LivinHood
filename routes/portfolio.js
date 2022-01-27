const Controller = require ('../controllers')
const express = require('express')
const router = express.Router()

router.get ('/', Controller.listPortfolio)
router.get ('/:PortfolioId', Controller.portfolioById)
router.post ('/:PortfolioId/sell', Controller.sell)
// router.post ('/buy/:StockId', Controller.main) //BUY STOCK => MAKE NEW PORTFOLIO
// router.get ('/:PortfolioId', Controller.main) //Portfolio Detail
// router.get ('/:PortfolioId/sell', Controller.main) //Sell Stock by amount, if amount = zero, DELETE PORTFOLIO

module.exports = router