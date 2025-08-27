const OrderService = require("../services/orderService")
const { createOrderSchema, getOrderSchema } = require("../utils/validators/orderValidator")


class OrderController{

  static async create(req, res){
    const orderData = createOrderSchema.safeParse(req.body)

    if(!orderData.success){
      return res.status(400).json(orderData.error.issues)
    }

    try{
      const order = await OrderService.create(orderData.data)
      return res.status(201).json(order)
    }
    catch(error){
      return res.status(500).json(error)
    }
  }

  static async getById(req, res){
    const orderData = getOrderSchema.safeParse(req.params)

    if(!orderData.success){
      return res.status(400).json(orderData.error.issues)
    }

    try{
      const order = await OrderService.getById(orderData.data.id)
      return res.status(201).json(order)
    }
    catch(error){
      return res.status(500).json(error)
    }
  }
}

module.exports = OrderController