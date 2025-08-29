const app = require('./src/app')
const RabbitmqServer = require('./src/rabbitmq-server')

require('dotenv').config()

async function startServer(){
  const uri = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`
  const rabbitmqServer = new RabbitmqServer(uri)

  await rabbitmqServer.start();

  app.set('rabbitmqServer',rabbitmqServer)

  app.listen(3000,()=>{
    console.log('server running on port 3000')
  })
}

startServer()