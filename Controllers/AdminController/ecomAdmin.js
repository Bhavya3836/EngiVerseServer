const {productmodel} = require("../../Models/productmodel")
const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "../../Files/prodctAdmin");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null, uniqueSuffix + file.originalname);
//     },  
//   });

// const upload = multer({ storage: storage });

module.exports.productAdd = async(req,res)=>{
    try{
        const data = req.body
        // const imageName = req.file.filename;
        const modelStore = new productmodel({
            productName : data.pName,
            productPrice : data.pPrice, 
            productDesc: data.pDesc,
            productCat : data.pCat,
            //productImage : imageName
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