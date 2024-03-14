const mongoose=require('mongoose')

 


const options={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

module.exports=async()=>{

    try{
        await mongoose.connect(process.env.URI,options) 

        console.log("connected to database");

    }catch(error){

        console.log("Error");
    }
}