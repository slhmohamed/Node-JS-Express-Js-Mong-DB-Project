const express=require('express')
const router=express.Router()
const {createAccount,getAllAccount,getSingleAccount}=require('../controllers/account.controller')
const validationObjectId=require('../middleware/validationObjectId')
const adminValidation=require('../middleware/admin')
const authValidation=require('../middleware/auth')
router.post('/createAccount',createAccount);
router.get('/getAllAccount',[authValidation,adminValidation],getAllAccount)
router.get('/getSingleAccount/:accountId',validationObjectId,getSingleAccount)
module.exports=router