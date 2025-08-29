const { createCustomerSchema, getCustomerSchema } = require('../utils/validators/customerValidator')
const CustomerService = require('../services/customerService')

class CustomerController{

  static async create(req, res){
    const customerData = createCustomerSchema.safeParse(req.body)

    if(!customerData.success){
      const errors = customerData.error
      return res.status(400).json(errors.issues) 
    }

    try{
      const customer = await CustomerService.create(customerData.data)
      return res.status(201).json(customer)
    }
    catch(error){
      return res.status(500).json({message: error.message})
    }
  }

  static async getById(req, res){

    const customerData = getCustomerSchema.safeParse(req.params)

    if(!customerData.success){
      const errors = customerData.error
      return res.status(400).json(errors.issues)  
    }

    try{
      const customer = await CustomerService.getById(customerData.data.id)
      return res.status(200).json(customer)
    }
    catch(error){
      return res.status(500).json({message: error.message})
    }
  }
}

module.exports = CustomerController