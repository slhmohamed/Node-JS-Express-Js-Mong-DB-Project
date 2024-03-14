const express=require('express')
const connection=require('./config/DB')

const userRoute=require('./routes/user.route')

const accountRoute=require('./routes/account.route')
require('dotenv').config()
 


const authRoute=require('./routes/auth.route')
const app=express()
//
app.use(express.json())


app.use('/api/user',userRoute)
app.use('/api/account',accountRoute)
app.use('/api/auth',authRoute)
connection()
app.use('/uploads', express.static(__dirname + '/uploads'));


const PORT =process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server starting : ${PORT}`);
})