const { Account } = require('../models/account.model')
const mongoose = require('mongoose');


module.exports.createAccount = async (req, res) => {
    try {

        const account = new Account({
            type: req.body.type,
            user: req.body.userId
        })
        const newAccount = await account.save()

        let responseObject = {
            result: newAccount,
            message: 'Account creadted'
        }
        res.status(200).send(responseObject)

    } catch (error) {
        res.status(400).send('Error to create new account')
    }
}

module.exports.getAllAccount=async (req,res)=>{
    try{
        const accounts=await Account.find()
        let responseObject = {
            result: accounts,
            message: 'list of accounts'
        }
        res.status(200).send(responseObject)
    }catch(error){
        console.log(error)
        res.status(500).send('Server Error')
    }
}


module.exports.getSingleAccount=async(req,res)=>{
    try{

        if(!mongoose.Types.ObjectId.isValid(req.params.accountId)){
                res.status(400).send('Invalid params')
        }
        const account=await Account.findById(req.params.accountId).populate({path:'user',select:'firstName lastName'})
        let responseObject = {
            result: account,
            message: 'Account details'
        }
        res.status(200).send(responseObject)
    }catch(error){
        console.log(error)
        res.status(500).send('Server Error')
    }

}