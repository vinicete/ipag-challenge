const {v4: uuid} = require('uuid')
const ProductRepository = require('../repositories/productRepository')

  class ProductService{

    static async create(productData){

      const id = uuid()
      const prod = {id, ...productData}
      return await ProductRepository.create(prod)

    }

    static async getById(id){

      return await ProductRepository.getById(id)
    }
  }

  module.exports = ProductService