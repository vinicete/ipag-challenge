const OrderRepository = require("../repositories/orderRepository")
const ProductService = require('./productService')
const {v4: uuid } = require('uuid')


class OrderService{

  static async create(orderData){
    const id = uuid()
    const baseStatus = 'PENDING'
    const createdAt = new Date()
    const updatedAt = null

    const {cust_id , items} = orderData

    let totalValue = 0

    const orderItems = await Promise.all( //process all the promisses from map

      items.map(async (item)=>{
        let prod = await ProductService.getById(item.prod_id)

        if (!prod) {
          throw new Error(`Produto não encontrado`);
        }

        return {
          id: uuid(),
          prod_id: item.prod_id,
          quantity: item.quantity,
          purchase_value: prod.prod_value
        }
      })
    )
    

     
    orderItems.forEach(item => {
      totalValue += item.purchase_value * item.quantity
    });

    const order = {
      id,
      cust_id,
      totalValue,
      ordStatus : baseStatus,
      createdAt,
      updatedAt,
      orderItems
    }

    console.log("ORDER ID: "+ order.id +
      "\nCUST_ID: " +cust_id + "\nTotalValue: " + totalValue
    )

    try{
      return await OrderRepository.create(order)
    }
    catch(error){
      console.error(error)
      throw new Error(error)
    }
    

  }

  static async getById(id){
    try{
      return await OrderRepository.getById(id)
    }
    catch(error){
      console.log(error)
      throw error
    }
    
  }
}

module.exports = OrderService