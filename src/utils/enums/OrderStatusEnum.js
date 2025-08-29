

const orderStatusEnum = Object.freeze({
  CANCELED: 0,
  PENDING: 1,
  WAITING_PAYMENT: 2,
  PAID: 3,
  PROCESSING: 4,
  SHIPPED: 5,
  DELIVERED: 6
})

module.exports = orderStatusEnum