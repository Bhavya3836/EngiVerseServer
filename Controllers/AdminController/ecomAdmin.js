const {productmodel} = require("../../Models/productmodel")

module.exports.productAdd = async(req,res)=>{
    try{
        const data = req.body
        const modelStore = new productmodel({
            productName : data.pName,
            productPrice : data.pPrice, 
            productDesc: data.pDesc,
            productRating : data.pRating,
            productCat : data.pCat
        })
        console.log(data)
        await modelStore.save()
        res.json({message:"Product Added"})
    }
    catch(e){
        console.log(e)
        res.json({error:e,message:e.message})
    }
}