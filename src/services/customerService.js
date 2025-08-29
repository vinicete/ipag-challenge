const CustomerRepository = require('../repositories/customerRepository')
const {v4: uuid} = require('uuid')

class CustomerService{
  
  static async create(customerData){

    const id = uuid()
    const createdAt = new Date()

    const cust = { id , createdAt, ...customerData}
    return await CustomerRepository.create(cust)
  }

  static async getById(id){

    return await CustomerRepository.getById(id)
  }
}

module.exports = CustomerService