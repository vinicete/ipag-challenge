const OrderService = require("../services/orderService")
const { createOrderSchema, getOrderSchema, updateStatusOrderSchema, getIdOrderSchema } = require("../utils/validators/orderValidator")


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
      return res.status(500).json({message: error.message})
    }
  }

  static async getById(req, res){
    const orderData = getIdOrderSchema.safeParse(req.params)

    if(!orderData.success){
      return res.status(400).json(orderData.error.issues)
    }

    try{
      const order = await OrderService.getById(orderData.data.id)
      return res.status(201).json(order)
    }
    catch(error){
      return res.status(500).json({message: error.message})
    }
  }

  static async updateStatus(req, res){

    const orderId = getIdOrderSchema.safeParse(req.params)
    const orderData = updateStatusOrderSchema.safeParse(req.body)

    if(!orderData.success || !orderId.success){
      console.error("Erro ao enviar dados para update!")
      return res.status(400).json(orderData.error.issues)
    }

    try{
      const order = await OrderService.updateStatus(orderData.data, orderId.data.id)
      return res.status(201).json(order)
    }
    catch(error){
      console.error(error)
      return res.status(500).json({message: error.message})
    }

  }
}

module.exports = OrderController