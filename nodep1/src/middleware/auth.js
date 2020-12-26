const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor')

const auth = async(req, res, next)=>{
    console.log('hello auth')
    try{
        const token = req.header('Authorization').replace("Bearer ", "")
        const decodedToken = jwt.verify(token, 'tsrnmb')
        const data = await Doctor.findOne({
            _id : decodedToken._id, 'tokens.token': token
        })
        if(!data)throw new Error()
        req.token = token
        req.data = data
        next()
    }
    catch(e){
        res.status(500).send({
            status:0,
            msg:"need auth",
            data: ""
        })
    }    
}

module.exports = auth