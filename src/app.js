const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const customersRoutes = require('./routes/customerRoutes')
const productsRoutes = require('./routes/productRoutes')


app.get('/', (req, res)=>{
  res.send('ooooi')
})


app.use('/customers',customersRoutes)
app.use('/products',productsRoutes)


module.exports = app