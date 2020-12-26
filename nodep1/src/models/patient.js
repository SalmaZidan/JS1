const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name:{
        type: String
    },
    username:{
        type: String,
        unique: true
    },
    pass:{
        type: Number,
        minLength : 6,
        maxLength : 100,
        trim : true
    },
    history:[
        {
            visitDate:{
                type : Date
                },
            description:{
                type: String
            }
        }
    ],
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    }


})

// patientSchema.methods.addRecord = async function(record,_id){
//     const patient = await Patient.findOne({ _id })
//     let m = patient.history.concat(record)
//     patient.history = m
//     console.log(m)
//     return(m)
//     //doctor.tokens = doctor.tokens.concat({token})
//     //await doctor.save()
//     //return token

// }

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient