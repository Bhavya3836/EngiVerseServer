const express = require("express")
const {Login} = require("../Controllers/UserController")
const {readLogin} = require("../Controllers/UserController")
const {signUp,otp,check} = require("../Controllers/UserController")




const router = express.Router()

router.route('/otp').post(otp)
router.route('/check').post(check)
router.route('/signup').post(signUp)
router.route('/login').post(Login)
router.route('/getlogin').get(readLogin)

module.exports = router