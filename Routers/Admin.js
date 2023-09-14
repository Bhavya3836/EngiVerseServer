const router = require("express").Router()
const {productAdd} = require("../Controllers/AdminController/ecomAdmin")

const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../../Files/prodctAdmin");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },  
  });

const upload = multer({ storage: storage });

router.route('/product').post(productAdd,upload.single("image"))


module.exports = router