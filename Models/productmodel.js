const {Schema,model} = require('mongoose')

module.exports.productmodel = model('productamodel',Schema({
    productName : {
        type:String,
        required:true
    },
    productPrice : {
        type:String,
        required:true
    },
    productDesc: {
        type:String,
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
    productImage : {
        type:String,
        required:true
    }
},{timestamps:true}))