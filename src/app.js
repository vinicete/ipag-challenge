const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const customersRoutes = require('./routes/customerRoutes')


app.get('/', (req, res)=>{
  res.send('ooooi')
})


app.use('/customers',customersRoutes)


module.exports = app