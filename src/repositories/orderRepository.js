const db = require('../config/db')

class OrderRepository{

  static async create(orderData){

    const {id,
      cust_id,
      totalValue,
      ordStatus,
      createdAt,
      updatedAt,
      orderItems} = orderData


    const res = await db.query(`INSERT INTO public.orders(
                            ord_id, cust_id, ord_total_value, ord_status, ord_created_at, ord_updated_at)
                            VALUES ($1, $2, $3, $4, $5, $6)
                            RETURNING *;`,[id,cust_id,totalValue,ordStatus,createdAt,updatedAt])

    try{
      let items = await Promise.all(
        orderItems.map(async (item) => {
        await db.query(`INSERT INTO public.order_items(
                        oi_id, ord_id, prod_id, oi_quantity, oi_purchase_value)
                        VALUES ($1, $2, $3, $4, $5);`,[item.id,id,item.prod_id,item.quantity,item.purchase_value])
        })

      )
        

      
      return res.rows[0]
    }
    catch(error){
      console.log(error)
      throw error
    }
  }

  static async getById(id){
  
    const ordRes = await db.query(`SELECT ord_id, cust_id, ord_total_value, ord_status, ord_created_at, ord_updated_at
	                              FROM public.orders
                                WHERE ord_id = $1`,[id])
    if(!ordRes){
      throw new Error("Order not found")
    }
    
    return ordRes.rows[0]
  }

  static async updateStatus(orderData){

    const { id, ord_status, updatedAt } = orderData
    const res = await db.query(`UPDATE public.orders
                                SET ord_status= $1, ord_updated_at= $2
                                WHERE ord_id = $3;`,[ord_status, updatedAt, id])

    return res.rows[0]
  }
}



module.exports = OrderRepository