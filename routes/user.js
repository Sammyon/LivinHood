const Controller = require ('../controllers')
const express = require('express')
const router = express.Router()
const portfolio = require('./portfolio.js')

router.get ('/', Controller.main) // LIST USER
router.get ('/:UserId', Controller.main) // USER PROFILE
router.get ('/:UserId/listCompany', Controller.main) // 
router.post ('/:UserId/employees/add', Controller.main) // 
// router.get ('/:UserId/employees/:employeeId/edit', Controller.formEditEmployee) // 
// router.post ('/:UserId/employees/:employeeId/edit', Controller.editEmployee) // 
// router.get ('/:UserId/employees/:employeeId/delete', Controller.delEmployee) // 
router.use ('/:UserId/portfolio', portfolio) // 


module.exports = router