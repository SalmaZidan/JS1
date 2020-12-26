const express= require('express')
const Patient = require('../models/patient')
const auth = require('../middleware/auth')
const patient = require('../models/patient')

const router = new express.Router()

router.post('/Patient/add', auth, async(req, res)=>{

    const patient  = new Patient({
        ...req.body,
        doctor:req.data._id        
    })
    try{
        await patient.save()
        res.status(200).send({
            status:true,
            data: patient,
            msg: "Done"
        })
    }
    catch(e){
        res.status(500).send({
            status:false,
            data:"",
            msg: e
        })
    }

})


router.get('/Patient/search/:id', auth,async(req, res)=>{
    const _id = req.params.id
    try{
        const Singlepatient = await Patient.findById(_id)
        //console.log(Singlepatient)
        if(!Singlepatient){
            res.status(200).send({
                status:2,
                data:"",
                msg:"patient not found"
            })
        }
        res.status(200).send({
            status:1,
            data: Singlepatient, 
            msg:"patient data retreived successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg:'error loading patient data'
        })

    }
    
   

})


router.post('/Patient/delete/:id',auth, async(req, res)=>{
    const _id = req.params.id
    try{
        const Singlepatient = await Patient.findByIdAndDelete(_id)

        if(!Singlepatient){
            res.status(200).send({
                status:2,
                data:"",
                msg:"patient not found"
            })
        }
        res.status(200).send({
            status:1,
            data: Singlepatient, 
            msg:"patient data deleted successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error delete patient"
        })
    }

})

router.post('/Patient/addRecord/:id',  async(req, res)=>{
    const _id = req.params.id
    const data = req.body
  
    try{
        let patient = await Patient.findById(_id)
        if(!patient){throw new Error ('')}
        patient.history = patient.history.push(data)
        console.log(patient.history)
        res.send({patient,data})

        // m = patient.history.concat({data})
        // patient.history = patient.history.concat({data}) 
        // console.log(patient.history)
        // console.log(m)
        // console.log(data)

        // await Patient.update(
        //     {  _id: _id},
        //     { $push: { history : m } }
        // )
        // patient = await Patient.findById(_id)
        // console.log(patient)

        //patient.save()
        res.status(200).send({
            status:1,
            data: patient, 
            msg:"patient record Add successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error added record"
        })
    }

})







module.exports = router