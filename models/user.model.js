const mongoose=require('mongoose')
const Joi=require('joi')
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["SuperAdmin","Admin"],
        required:true
    },
    avatar:{
        type:String
    },
    zipCode:{
        type:Number
    }
},
   
{ timestamps:true}

)

const validationRegisterUser=(user)=>{

    const schema={
        firstName:Joi.string().min(10).max(30).required(),
        lastName:Joi.string().min(10).max(30).required(),
        email:Joi.string().required(),
        password:Joi.string().min(6).max(12).required(),
        role:Joi.string().valid("SuperAdmin","Admin").required()
    }
    return Joi.validate(user,schema)
}

module.exports.User=mongoose.model("user",userSchema)

 exports.validationRegisterUser=validationRegisterUser