const {User, Portofolio, Stock, Company} = require ('../models')
const bcrypt = require('bcryptjs')
const { Op } = require("sequelize");
const price = require ('../helpers/currentPrice')
const currency = require ('../helpers/currency')



//!! DUMMY CAN BE COPY PASTED

class Controller {
  static main (req, res) {
    User.countUser()
      .then(data => {
        console.log(data);
        res.render('landing', {data, currency})
      })
      .catch(err => {
        res.send(err)
      })
    
  }

  static landing (req, res) {
    res.redirect('/')
  }

  static loginForm (req, res) {
    res.render('login')
  }

  static login (req, res) {
    const { error } = req.query
    const {name, password} = req.body
    User.findOne({
      where: {
        name: name
      }
    })
      .then(user => {
        if (error) {
          throw new Error (error)
        } else {
          if (user) {
            let valid = bcrypt.compareSync(password, user.password)
            if (valid) {
              req.session.UserId = user.id //! SESSION START
              req.session.isAdmin = user.isAdmin
              //console.log(req.session);
              res.redirect('/profile')
            } else {
              res.render('login', {error: 'Password Salah'})
            }
          } else {
            res.render('login', {error: 'User Tidak Ditemukan'})
          }
        }
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') { //!KALAU ADA ERROR VALIDASI AKAN MASUK SINI
          let errors = []
          err.errors.forEach(e => errors.push(e.message))
          res.send (errors)
        } else {
          res.send (err) //! KALAU TIDAK ADA ERROR VALIDASI
        }
      })
  }

  static logout (req, res) {
    delete req.session.UserId
    delete req.session.isAdmin
    
    res.redirect('/')

  } 

  static formSignup (req, res) {
    res.render('register')
  }

  static signup (req, res) {
    let { name, bankAccountNumber, email, password, credit, isAdmin } = req.body;
    User.create({ name, bankAccountNumber, email, password, credit, isAdmin })
      .then(() => {
        res.redirect(`/login`) //! PATH REDIRECT
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') { //!KALAU ADA ERROR VALIDASI AKAN MASUK SINI
          let errors = []
          err.errors.forEach(e => errors.push(e.message))
          res.send (errors)
        } else {
          res.send (err) //! KALAU TIDAK ADA ERROR VALIDASI
        }
      })
  }

  static buy (req, res) {//! NEED TO FIX
    const {StockId} =  req.params
    Portofolio.increment('amount', {
      where: {
        id: StockId
      }
    })
      .then(_=> {
        res.redirect('/portfolio')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static newPortfolio (req, res) {
    const {StockId} =  req.params
    const {priceBought} = req.query
    const {amount} = req.body
    let {UserId} = req.session
    let totalPrice = Math.floor(priceBought * amount)

    Portofolio.create({ amount, priceBought, UserId, StockId }, {
    })
      .then(_=> {
        return User.decrement({credit: totalPrice}, { 
          where: { 
            id: UserId 
          },
        })
      })
      .then(_=> {
        res.redirect('/profile')
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') { //!KALAU ADA ERROR VALIDASI AKAN MASUK SINI
          let errors = []
          err.errors.forEach(e => errors.push(e.message))
          res.send (errors)
        } else {
          res.send (err) //! KALAU TIDAK ADA ERROR VALIDASI
        }
      })
  }

  static sell (req, res) {//! SALAH
    // UPDATE CREDIT
    const {PortfolioId} =  req.params
    const {currentPrice} =  req.query
    let {UserId} = req.session
    let totalProfit = 0
    let deleteData = ''

    Portofolio.findOne ({
      include: {
        model: User
      },
      where: {
        id: PortfolioId
      }
    })
    .then(data => {
        totalProfit = currentPrice * data.amount
        deleteData = data
        return Portofolio.destroy({
          where: {
            id: +PortfolioId
          },  
          individualHooks: true
        })
      })
      .then(_=> {
        return User.update({
          credit: Math.floor(deleteData.User.credit + totalProfit)
        }, {
          where: {
            id: UserId
          }
        })
      })
      .then(_=> {
        res.redirect('/portfolio')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static topUp (req, res) {

    let {credits} = req.body
    let {UserId} = req.session
    //console.log(credits, req.session, "<<<< body")
     User.increment({credit: credits}, { 
      where: { 
        id: UserId 
      },
    })
    .then(data=>{
      res.redirect('profile')
    }) 
  }

  static stockById (req, res) {
    const {StockId} = req.params
    let stockData = {}

    Stock.findOne({
      include: {
        model: Company
      },
      where: {
        id : StockId
      }
    })
      .then(data =>{
        stockData = data
        return price(data.stockCode)
      })
      .then(currentPrice => {
        res.render('stockById', {stockData, currentPrice, currency})
      })
      .catch(err =>{
        console.log(err);
        res.send(err)
      })
  }

  static listPortfolio (req, res) {
    let {UserId} = req.session
    let portfolioData = ''
    Portofolio.findAll({
      include:{
        model: Stock
      },
      where : {
        UserId : UserId
      }
    })
      .then(data => {
        portfolioData =  data
        res.render('portfolio', {portfolioData, currency})
      })
      .catch(err => {
        res.send(err)
        // console.log(err)
      })
  }

  static listCompany (req, res) {
    const isAdmin = req.session.isAdmin
    Company.findAll()
        .then(data => {
          res.render('companies', {data, isAdmin})
        })
        .catch(err => {
          res.send(err)
        })
  }

  static listStock (req, res) {
    const isAdmin = req.session.isAdmin
    let {search} = req.query

    if (search) {
      Stock.findAll({
        include: {
          model: Company,
        },
          where: {
            stockCode: {[Op.iLike]: `%${search}%`}
          },
        })
        .then(data => {
          console.log(data, "<<<< data")
          
          res.render('stocks', {data, isAdmin})
        })
        .catch(err => {
          res.send(err)
        })
    } else {
      Stock.findAll({
        include: {
          model: Company,
        },
      })
        .then(data => {

          res.render('stocks', {data, isAdmin})
        })
        .catch(err => {
          res.send(err)
        })
    }
  }

  static portfolioById (req, res) {
    const {PortfolioId} = req.params
    let stockData = {}

    Portofolio.findOne({
      include: {
        model: Stock
      },
      where: {
        id: PortfolioId
      }
    })
      .then(data =>{
        stockData = data
        return data.Stock.price()
      })
      .then(currentPrice => {
        res.render('portfolioById', {stockData, currentPrice, currency})
      })
      .catch(err =>{
        res.send(err)
      })
  }

  static profile (req, res) {
    let {UserId} = req.session

    User.findByPk(UserId)
    .then(data => {
      // console.log(data)
      res.render('profile', {data, currency})
    })
  }
}

module.exports = Controller