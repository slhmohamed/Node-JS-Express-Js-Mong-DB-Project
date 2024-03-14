const mongoose=require('mongoose')

const accountSchema=new mongoose.Schema({

    type:{
        type:String,
        enum:["current","saving"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},
{
    timestamps:true
})

module.exports.Account=mongoose.model('Account',accountSchema)