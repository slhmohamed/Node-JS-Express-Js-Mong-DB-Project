const { isValidObjectId } = require('mongoose')
const { User } = require('../models/user.model')
 
const ObjectId = require('mongoose').Types.ObjectId;

exports.createUser = async (req, res) => {
    try {
        const exist=await User.findOne({email:req.body.email})
        if(exist){
            res.status(400).send(`Email already used ${req.body.email}`)
        }
        const user = User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role:req.body.role
        })
         await user.save()
        res.status(200).json({result:user,message:'User Created'})
    }
    catch (error) {
        res.status(400).json({error:error})
    }
}

exports.getAllUser=async(req,res)=>{

    try{

        const users=await User.find().select('-password')

        res.status(200).json({data:users})

    }catch(error){
        res.status(400).json({error:error})
    }
}

//get user by id 

exports.getSingleUser=async(req,res)=>{
    try{
        //const id=req.params.id;
            if(!ObjectId.isValid(req.params.id)){
                res.send(400).send('Incorrect id ')
            }
        const user=await User.findById(req.params.id)
        res.status(200).send({result:user})
    }catch(error){
        console.log("Eroor",error)
        res.status(500).send('Error ')
    }
}

exports.deleteUser=async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send('Deleted!!')
    }
    catch(error){

        res.status(500).send('Error')
    }
}


exports.updateUser=async(req,res)=>{
   // const {firstName,lastName,email,phone}=req.body
   console.log(req.body)
    try{
        const user =await User.findByIdAndUpdate(req.params.id,req.body)
        let result={
            data:user,
            message:'Updated'
        }

     //   res.status(200).send({data:result,message:'Updated'})
     res.status(200).send(result)
    }catch(error){
        console.log('Error',error)
        res.status(400).send('Error')
    }
}

exports.getUserByEmail=async(req,res)=>{

    try{
       
        const result=await User.findOne({email:req.params.email})

        if(result){
            res.status(200).send({data:result})
        }else{
            res.status(200).send(`User not found with email ${req.params.email}`)
        }

    }catch(error){

        console.log('Eroor : ', error)

        res.status(500).send('Error')
    }
}