const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.get('/', (req, res)=>{
  res.send('ooooi')
})


module.exports = app