const express=require('express')
const {createUser,getAllUser,getSingleUser,deleteUser,updateUser,getUserByEmail}=require('../controllers/user.controller')
const router=express.Router()

//create user
//http://localhost:4000/api/user/createUser
router.post('/createUser',createUser)
//get list users(get all users)
//http://localhost:4000/api/user/getAll
router.get('/getAll',getAllUser)
//get user by id
//http://localhost:4000/api/user/getSingleUser/65ea298ec0ddeb12975e15e6
router.get('/getSingleUser/:id',getSingleUser)
//http://localhost:4000/api/user/deleteUser/65ea298ec0ddeb12975e15e6
router.delete('/deleteUser/:id',deleteUser)
//update user
//http://localhost:4000/api/user/updateUser/65ea2ce1fd48011b37872c7a
router.put('/updateUser/:id',updateUser)
//get user by email
//http://localhost:4000/api/user/getUserByEmail/email
router.get('/getUserByEmail/:email',getUserByEmail)
module.exports=router