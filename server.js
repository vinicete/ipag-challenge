const app = require('./src/app')
const RabbitmqServer = require('./src/rabbitmq-server')

require('dotenv').config()

async function startServer(){
  const uri = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`
  const rabbitmqServer = new RabbitmqServer(uri)

  try {
    await rabbitmqServer.start();
    console.log('Connected succesfuly')
  } catch (error) {
    console.error('Failed to connect to Rabbitmq', error.message);
  }

  app.set('rabbitmqServer',rabbitmqServer)

  app.listen(3000,()=>{
    console.log('Server running on port 3000')
  })
}

startServer()