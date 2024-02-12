const { productmodel } = require("../Models/productmodel")

module.exports.searchBar = async(req,res)=>{
    try{
        const data = req.body

        const searching = await productmodel.findOne({productName:data.searchBody})
        console.log(searching)
        if(searching){
            res.status(200).json({data:searching,message:"Found"})}
        else{
            res.status(400).send("Not Found")
        }
    }
    catch(e){
        console.log(e)
    }
}

module.exports.catFilter = async(req,res)=>{
    try{
        const data = req.body
        const tempstroring = await productmodel.findOne({productCat:data.productCat})
        if(tempstroring)
        {
            console.log("moye moye",tempstroring)
            res.json({message:"jsk",data:tempstroring,status:200})
        }else{
            console.log("Nahi mila ")
            res.json({message:"sui ja",status:404   })
        }


    }
    catch(e){
        console.log(e)
        res.send(e)
    }
}


module.exports.shoppingCart = async(req,res)=>{
    try{
        const id = req.params.id
        const extrackingJWT = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
        const userId = decoded._id


    }
    catch(e){

    }
}

module.exports.singleProductDetail = async(req,res)=>{
    try{
        const id = req.params.id
        const temp = await productmodel.findById(id)
        console.log("Hello");
        res.json({message:"Displayed",data:temp})
    }
    catch(e){
        res.json({error:e,message:e.message})
    }
}

