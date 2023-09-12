const express = require("express")
const {Login} = require("../Controllers/UserController")
const {readLogin} = require("../Controllers/UserController")
const {signUp,otp} = require("../Controllers/UserController")
const {verifyOtp} = require("../Controllers/UserController")
const {zinSakai} = require("../Controllers/UserController")
const { signupAuth } = require("../Middleweres/signUpMiddlewere")
const { loginAuth } = require("../Middleweres/loginMiddlewere")



const router = express.Router()

router.route('/otp').post(otp)
router.route('/signUp').post(signupAuth,signUp)
router.route('/login').post(Login)
router.route("/profile").get(loginAuth,zinSakai)
router.route("/verify").post(verifyOtp)


module.exports = router