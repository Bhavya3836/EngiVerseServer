const {Schema,model}  = require("mongoose")

const ImageDetailsScehma = new mongoose.Schema(
    {
     image:String
    }
)
mongoose.model("imagemodel", ImageDetailsScehma)