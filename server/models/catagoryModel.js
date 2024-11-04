const mongoose=require("mongoose")

const catagorySchema= new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        lowercase:true,
    }
})

module.exports=mongoose.model("Catagory",catagorySchema)