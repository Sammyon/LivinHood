const stockPrice = require ('yahoo-stock-prices')

function price(stockCode) {
  return new Promise ((resolve, reject) => {
    stockPrice.getCurrentPrice(stockCode)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  }) 
}

module.exports = price