const Controller = require ('../controllers')
const express = require('express')
const router = express.Router()

router.get ('/', Controller.main)// LIST COMPANIES
router.get ('/:CompanyId/edit', Controller.main)// EDIT COMPANY FORM 
router.post ('/:CompanyId/edit', Controller.main)// UPDATE COMPANY EDIT
router.get ('/:CompanyId/delete', Controller.main)// DELETE COMPANY

module.exports = router