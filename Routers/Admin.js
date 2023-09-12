const router = require("express").Router()
const {productAdd} = require("../Controllers/AdminController/ecomAdmin")

router.route('/product').post(productAdd)

module.exports = router