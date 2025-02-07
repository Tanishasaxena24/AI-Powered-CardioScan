const mongoose=require('mongoose')

const user=mongoose.Schema({
    username:{type:String,required:true, minLength:5},
    email:{type:String,required:true,minLength:5,unique:true},
    password:{type:String,required:true,minLength:5},
    profession: {
        type: String,
        enum: ["doctor","Cardiologist", "patient", "ECG_Operator","others"], // Allowed values
        required: true // Ensures the field is mandatory
    }
})


const User=mongoose.model('User',user);
module.exports=User