const stockPrice = require ('yahoo-stock-prices')

function price(stockCode) {
  return stockPrice.getCurrentPrice(stockCode)
}

module.exports = price