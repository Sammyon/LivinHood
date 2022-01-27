const StockSocket = require('stocksocket')
const stockPrice = require ('yahoo-stock-prices')

let stockArr = ["TSLA", "NNDM", "AAPL", "MARA"]

function price(stockCode) {
  return new Promise ((resolve, reject) => {
  stockCode.forEach(e => {
    stockPrice.getCurrentPrice(e)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }) 
}

price(stockArr)
  .then(data=> console.log(data))
  .catch(err=> console.log(err))

(Math.abs(stockNew - stockOld)/100)