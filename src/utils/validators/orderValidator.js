const { z, string, email, uuid, number } = require('zod')

const orderItemSchema = z.object({
  prod_id: uuid(),
  quantity: number()
})

const createOrderSchema = z.object({
  cust_id: uuid(),
  items : z.array(orderItemSchema)

})

const getOrderSchema = z.object({
  id: uuid()
})


module.exports ={
  createOrderSchema,
  getOrderSchema,
  orderItemSchema
}
