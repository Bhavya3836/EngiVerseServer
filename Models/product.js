const {Schema,model} = require('mongoose')

module.exports.product = model('product',Schema({
    productName : {
        type:String,
        required:true
    },
    productPrice : {
        type:String,
        required:true
    },
    productDesc: {
        type:Date,
        required:true
    },
    productRating : {
        type:String,
        required:true
    },
    productCat : {
        type:String,
        required:true
    },
},{timestamps:true}))