const express=require('express')
const router=express.Router()

const {signup, signin}=require('../controllers/auth.controller')

const {upload}=require('../middleware/uploadFile')

router.post('/signup',upload.single('file') ,signup)

router.post('/signin',signin)

module.exports=router 