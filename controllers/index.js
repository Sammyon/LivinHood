const {User, Portofolio, Stock, Company, sequelize} = require ('../models')
const bcrypt = require('bcryptjs')
const { Op } = require("sequelize");
const session = require('express-session')


//!! DUMMY CAN BE COPY PASTED

class Controller {
  static main (req, res) {
    res.render('landing')
  }

  static landing (req, res) {
    res.render('landing')
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
              console.log(req.session);
              res.redirect('/profile')
            } else {
              throw new Error (`Wrong Password`)
            }
          } else {
            throw new Error (`User not found`)
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

  static buy (req, res) {

  }

  static listPortfolio (req, res) {
    let {UserId} = req.session
    Portofolio.findAll({
      include:{
        model: Stock
      },
      where : {
        UserId : UserId
      }
    })
      .then(data => {
        res.render('portfolio', { data })
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
    Stock.findAll({
      include: {
        model: Company
      } 
    })
      .then(data => {
        res.render('stocks', {data, isAdmin})
      })
      .catch(err => {
        res.send(err)
      })
  }


  static profile (req, res) {
    let {UserId} = req.params

    User.findByPk(UserId) 
    
    .then(data=>{
      console.log(data)
      res.render('profile', {data})
    })
  }

  
}

module.exports = Controller