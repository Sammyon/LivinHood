const Controller = require ('../controllers')
const express = require('express')
const router = express.Router()

router.get ('/', Controller.main) //List Portfolio of user
router.get ('/add', Controller.main) //FORM ADD Portfolio
router.post ('/add', Controller.main) //ADD Portfolio
router.get ('/stock', Controller.main) //ADD list stock to buy
router.post ('/buy/:StockId', Controller.main) //BUY STOCK => MAKE NEW PORTFOLIO
router.get ('/:PortfolioId', Controller.main) //Portfolio Detail
router.get ('/:PortfolioId/sell', Controller.main) //Sell Stock by amount, if amount = zero, DELETE PORTFOLIO

module.exports = router