const CustomerController = require('../controllers/customerController')
const express = require('express')
const router = express.Router()

router.post('/', CustomerController.create)
router.get('/:id', CustomerController.getById)

module.exports = router
