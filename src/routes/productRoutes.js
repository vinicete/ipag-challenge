const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')


router.post('/',ProductController.create)
router.get('/:id',ProductController.getById)

module.exports = router