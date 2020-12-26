const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

//const Doctor = mongoose.model('Doctor',{
const DoctorSchema = new mongoose.Schema({
    name:{
        type: String
    },
    address:{
        type: String
    },
    username:{
        type: String,
        unique: true,
        trim: true
    },
    pass:{
        type: Number,
        minLength : 6,
        maxLength : 100,
        trim: true
    },
    spesialize:{
        type: String
    },
    phone:{
        type: Number,
        minLength : 10
    },
    whatsapp:{
        type: Number,
        minLength : 10
    }, 
    status:{
        type: String
    },
    tokens:[
        {
            token:{type: String}
        }
    ]

})

DoctorSchema.methods.toJSON=function(){
    const doctor = this
    const doctorOBJ = doctor.toObject()
    //delete doctorOBJ.pass
    return doctorOBJ
}

DoctorSchema.pre('save', async function(next){
    const doctor = this
    
    try{
        doctor.pass =  bcrypt.hashSync(doctor.pass, 12)
    }
    catch(e){
        console.log(e)
    }

    if(doctor.isModified('pass')){}

    next()
})

DoctorSchema.statics.findByCredentials = async function(username, pass){
    /*
    const doctor= await Doctor.findOne({ username })
    if(!doctor) throw new Error('unauthorized')
    const matched = await bcrypt.compare(pass, doctor.pass)
    if(!matched) throw new Error('unauthorized')
    return doctor    
    */
   const doctor= await Doctor.findOne({ "username" : username, "pass" : pass })
   if(!doctor) throw new Error('unauthorized')
   return doctor
   
}

DoctorSchema.methods.genrateToken = async function(){
    const doctor = this
    const token = jwt.sign({_id: doctor._id.toString()}, 'tsrnmb')
    doctor.tokens = doctor.tokens.concat({token})
    await doctor.save()
    return token

}

/*
const newDoctor = new Doctor(
    {name:'a', address:'hk', username:'hhyf', pass:8764}
)
newDoctor.save().then(console.log('Added')).catch(e=>console.log(e))
*/

const Doctor = mongoose.model('Doctor', DoctorSchema)
module.exports = Doctor