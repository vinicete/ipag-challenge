const db = require('../config/db')

class ProductRepository{

  static async create(productData){

    const {id, name, description, value } = productData

    const res = await db.query(`INSERT INTO public.product(
                                prod_id, prod_name, prod_description, prod_value)
                                VALUES ($1, $2, $3, $4);`,[id, name, description, value])

      return res.rows[0]
  }

  static async getById(id){
  
      const res = await db.query(`SELECT prod_id, prod_name, prod_description, prod_value
	                                FROM public.product
                                  WHERE prod_id = $1;`,[id])
      
      return res.rows[0]
    }
}



module.exports = ProductRepository