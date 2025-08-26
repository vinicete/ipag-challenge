const {z, uuid } = require('zod')

const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  value: z.number()
})

const getProductSchema = z.object({
  id: uuid()
})

module.exports ={
  createProductSchema,
  getProductSchema
}