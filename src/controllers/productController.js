const { createProductSchema, getProductSchema } = require('../utils/validators/productValidator')
const ProductService = require('../services/productService')

class ProductController{

  static async create(req, res){
    const productData = createProductSchema.safeParse(req.body)

    if(!productData.success){
      return res.status(400).json(productData.error.issues)
    }

    try{
      const prod = await ProductService.create(productData.data)
      return res.status(201).json(prod)
    }
    catch(error){
      return res.status(500).json({message: error.message})
    }
  }

  static async getById(req, res){

    const productData = getProductSchema.safeParse(req.params)

    if(!productData.success){
      const errors = productData.error
      return res.status(400).json(errors.issues)  
    }

    try{
      const prod = await ProductService.getById(productData.data.id)
      return res.status(200).json(prod)
    }
    catch(error){
      return res.status(500).json({message: error.message})
    }
  }
}

module.exports = ProductController