const OrderRepository = require("../repositories/orderRepository")
const orderStatusEnum = require("../utils/enums/OrderStatusEnum")
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
          throw new Error(`Product not found`);
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

  static async updateStatus(orderData,id, rabbitmqServer){

    const { ord_status, notes} = orderData
    const updatedAt = new Date()

    const order = await this.getById(id)

    if(!order){
      throw new Error("Order not found for update!")
    }

    //fazer a comparacao com todos os status, enum talvez

    let newStatus = orderStatusEnum[ord_status]
    let oldStatus = orderStatusEnum[order.ord_status] 


    if (!orderStatusEnum.hasOwnProperty(ord_status)) {
        throw new Error(`Status '${ord_status}' is invalid.`);
    }


    if(newStatus === orderStatusEnum.CANCELED){
      if(oldStatus>= orderStatusEnum.SHIPPED){
        throw new Error("Is not possible to cancel delivered orders!")
      }
    }

    if (oldStatus === orderStatusEnum.DELIVERED) {
        throw new Error("Delivered orders cannot have its status changed!");
    }

    if (newStatus !== oldStatus + 1) {
      throw new Error(`Transaction order ${oldStatus} to ${newStatus} is invalid! Transactions must be in sequence.`);
    }

    const statusOrderData = {id, ord_status, updatedAt}

    

    try{
      const res = await OrderRepository.updateStatus(statusOrderData)
      rabbitmqServer.publish('ipag',notes)
      return res
    }
    catch(error){
      console.log(error.message)
      throw error
    }
  }
}

module.exports = OrderService