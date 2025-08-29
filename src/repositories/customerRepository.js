const db = require('../config/db')

class CustomerRepository{


  static async create(customerData){

    const {id, name, document, email, phone, createdAt} = customerData
    
    const res = await db.query(`INSERT INTO public.customers(
                                cust_id, cust_name, cust_document, cust_email, cust_phone, cust_created_at)
                                VALUES ($1, $2, $3, $4, $5, $6)
                                RETURNING *;`,[id,name,document,email,phone,createdAt])
      return res.rows[0]
  }

  static async getById(id){

    const res = await db.query(`SELECT cust_id, cust_name, cust_document, cust_email, cust_phone, cust_created_at
	                              FROM public.customers
                                WHERE cust_id = $1;`,[id])
    
    return res.rows[0]
  }
}

module.exports = CustomerRepository 