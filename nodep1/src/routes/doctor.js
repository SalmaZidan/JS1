const express= require('express')
const Doctor = require('../models/doctor')
const auth = require('../middleware/auth')
const { ReplSet } = require('mongodb')

const router = new express.Router()

router.post('/Doctor/add', async (req, res)=>{
    const data = new Doctor(req.body)
    try{
        await data.save()
        const token = await data.genrateToken()
        res.status(200).send({
            status:1,
            data: data,
            msg: 'data inserted',
            token: token
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:e,
            msg:'error inserting data',
            token: ''
        })}
})

router.get('/allDoctors',auth, async(req,res)=>{
    try{
        const Doctors = await Doctor.find({})
        res.status(200).send({
            status:1,
            data: Doctors,
            msg: 'all doctors selected'
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg: 'error loading doctors data'
        })
    }
})

router.get('/Doctor/:id', async(req,res)=>{
    const _id = req.params.id
    try{
        const SingleDoctor = await Doctor.findById(_id)
        // not working
        if(!SingleDoctor){
            res.status(200).send({
                status:2,
                data:"",
                msg:"Doctor not found"
            })
        }
        // not working
        res.status(200).send({
            status:1,
            data: SingleDoctor, 
            msg:"Doctor data retreived successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg:'error loading Doctor data'
        })
    }
})

router.patch('/DoctorStatus/:id', async(req,res)=>{
    const _id= req.params.id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["status"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(400).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
    try{
        const doctor = await Doctor.findByIdAndUpdate(_id, updates,{
            new:true,
            runValidators:true
        })
        if(!doctor){
            res.status(200).send({
                status:2,
                data:"",
                msg:"doctor not found"
            })
        }
        res.status(200).send({
            status:1,
            data: doctor, 
            msg:"doctor data retreived successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error edit data"
        })
    }
})

router.post('/login', auth, async (req, res)=>{
    try{
        const doctor = await Doctor.findByCredentials(req.body.username , req.body.pass) 
        const token = await doctor.genrateToken()
        res.status(200).send({
            status:1,
            data: doctor,
            msg: 'logged in',
            token: token
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg: "login error",
            token:''
        })
    }

})

router.post('/doctor/profile', auth, async (req, res)=>{
    try{
        const doctor = req.data
        res.status(200).send({
            status:1,
            data: doctor,
            msg: 'ok',
            token: req.token
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg: "error",
            token:''
        })
    }

})

module.exports = router