const { User } = require('../models/user.model')
const bcrypt = require('bcrypt');
const salt = 10
const jwt=require('jsonwebtoken')
const{validationRegisterUser}=require('../models/user.model')
module.exports.signup = async (req, res) => {
    try {

        const validation=validationRegisterUser(req.body);
         
        if(validation.error){
          return  res.status(400).send(validation.error.details[0].message)
        }
        const exist = await User.findOne({ email: req.body.email }) 

        if (exist) {
            return res.status(400).send('Email already exsit!!')
        }
        //crypt password

        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword,
            role:req.body.role,
            avatar:req.file.path
        })

        const result = await user.save()
        res.status(200).send({ data: result, message: 'User created !!' })
    } catch (error) {
        console.log(error);
        res.status(400).send('Error!!')
    }
}

module.exports.signin=async(req,res)=>{ 
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).send('User not found with this email !! PLS TRY AGAIN')
        }
        const compare=await bcrypt.compare(req.body.password,user.password);
        console.log(`result of compare is ${compare}`);

        if(!compare){
            return res.status(400).send('Email or password is incorrect !!')
        }
       
        //generation of jwt

        const token=jwt.sign(
            {
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            role:user.role
        }
        ,process.env.SCREYKET,{expiresIn:process.env.expiresIn})

        res.status(200).send({token:token,status:true})
    }catch(error){
        console.log(error)
        res.status(400).send('Error')
    }
}