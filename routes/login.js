const Controller = require ('../controllers')
const express = require('express')
const router = express.Router()

router.get ('/admin', Controller.main) //LOGIN admin
router.get ('/user', Controller.main) //LOGIN user
router.get ('/newUser', Controller.main) //ADD newUser
router.post ('/newUser', Controller.main) //ADD newUser


module.exports = router