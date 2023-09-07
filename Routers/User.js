const express = require("express")
const {Login} = require("../Controllers/UserController")
const {readLogin} = require("../Controllers/UserController")
const {signUp,otp} = require("../Controllers/UserController")
const {verifyOtp} = require("../Controllers/UserController")



const router = express.Router()

router.route('/otp').post(otp)
router.route('/signUp').post(signUp)
router.route('/login').post(Login)
router.route("/verify").post(verifyOtp)


module.exports = router