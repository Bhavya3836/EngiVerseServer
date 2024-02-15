const express = require("express")
const {Login} = require("../Controllers/UserController")
const {signUp,otp} = require("../Controllers/UserController")
const {verifyOtp} = require("../Controllers/UserController")
const {zinSakai} = require("../Controllers/UserController")
const { signupAuth } = require("../Middleweres/signUpMiddlewere")
const { loginAuth } = require("../Middleweres/loginMiddlewere")
const { searchBar } = require("../Controllers/UserEcomController")
const { catFilter } = require("../Controllers/UserEcomController")
const {singleProductDetail} = require("../Controllers/UserEcomController")
const {accessChat} = require("../Controllers/textControllers/chatController")
const {fetchChats} = require("../Controllers/textControllers/chatController")
const {crtGroupChat} = require("../Controllers/textControllers/chatController")
const {messageSendBody} = require("../Controllers/textControllers/msgController")
const {messageGetBody} = require("../Controllers/textControllers/msgController")
const {getHackathon} = require("../Controllers/textControllers/communityController")
const {sendBroadcast} = require("../Controllers/textControllers/communityController")
const {getCommuntities} = require("../Controllers/textControllers/communityController")
const {getBroadcast} = require("../Controllers/textControllers/communityController")




const router = express.Router()

router.route('/otp').post(otp)
router.route('/signUp').post(signupAuth,signUp)
router.route('/login').post(Login)
router.route("/profile").get(loginAuth,zinSakai)
router.route("/verify").post(verifyOtp)
router.route("/search").post(searchBar)
router.route("/catFilter").post(catFilter)
router.route("/accessChat").post(accessChat)
router.route("/fetchChat").get(fetchChats)
router.route("/crtgroup").get(crtGroupChat)      
router.route("/productDesc").post(singleProductDetail)
router.route("/sendMsg/:id").post(messageSendBody)
router.route("/getMsg/:id").post(messageGetBody)
router.route("/getHackathon").post(getHackathon)
router.route("/sendBroadcast/:id").post(sendBroadcast)
router.route("/getBroadcast").post(getBroadcast)

//community routes
router.route("/getCommunity").post(getCommuntities)


module.exports = router