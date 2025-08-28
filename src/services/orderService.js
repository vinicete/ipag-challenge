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

  static async updateStatus(orderData,id){

    const { ord_status, notes} = orderData
    const updatedAt = new Date()

    const order = await this.getById(id)

    if(!order){
      console.log("ord_status -> "+ ord_status + "notes -> "+notes)
      throw new Error("Pedido não encontrado para update!")
    }

    //fazer a comparacao com todos os status, enum talvez

    let newStatus = orderStatusEnum[ord_status]
    let oldStatus = orderStatusEnum[order.ord_status] 

    console.log("" + oldStatus + newStatus)

    if (!orderStatusEnum.hasOwnProperty(ord_status)) {
        throw new Error(`Status '${ord_status}' é inválido.`);
    }


    if(newStatus === orderStatusEnum.CANCELED){
      if(oldStatus>= orderStatusEnum.SHIPPED){
        throw new Error("Não é possível cancelar pedidos já enviados!")
      }
    }

    if (oldStatus === orderStatusEnum.DELIVERED) {
        throw new Error("Pedidos já entregues não podem ter seu status alterado.");
    }

    if (newStatus !== oldStatus + 1) {
      throw new Error(`Ordem de transação ${oldStatus} para ${newStatus} inválida! Transações devem ser sequenciais.`);
    }

    const statusOrderData = {id, ord_status, updatedAt}

    try{
      return await OrderRepository.updateStatus(statusOrderData)
    }
    catch(error){
      console.log(error)
      throw error
    }
  }
}

module.exports = OrderService