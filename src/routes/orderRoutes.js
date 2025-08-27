const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/orderController')


router.post('/',OrderController.create)
router.get('/:id',OrderController.getById)

module.exports = router