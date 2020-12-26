const express= require('express')
require('./db/moongse')

const doctorRoutes = require('./routes/doctor')
const patientRoutes = require('./routes/patient')

const app = express()
const port = process.env.PORT || 3002
app.use(express.json())

app.use(doctorRoutes)
app.use(patientRoutes)


app.listen(port)