const StockSocket = require('stocksocket')

let stockArr = ["TSLA", "NNDM", "AAPL", "MARA"]

StockSocket.addTickers(stockArr, stockPriceChanged);

function stockPriceChanged(data) {
  console.log(data);
  StockSocket.removeAllTickers()
}