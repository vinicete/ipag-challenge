const { z, string, email, uuid, number } = require('zod')

const orderItemSchema = z.object({
  prod_id: uuid(),
  quantity: number()
})

const createOrderSchema = z.object({
  cust_id: uuid(),
  items : z.array(orderItemSchema)

})

const getIdOrderSchema = z.object({
  id: uuid()
})

const updateStatusOrderSchema = z.object({
  ord_status: string(),
  notes: string()
})


module.exports ={
  createOrderSchema,
  getIdOrderSchema,
  orderItemSchema,
  updateStatusOrderSchema
}
