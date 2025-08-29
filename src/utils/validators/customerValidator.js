const { z, string, email, uuid } = require('zod')


const createCustomerSchema = z.object({
  name: z.string(),
  document: z.string(),
  email: z.email(),
  phone: z.string()
})

const getCustomerSchema = z.object({
  id: uuid()
})


module.exports ={
  createCustomerSchema,
  getCustomerSchema
}
