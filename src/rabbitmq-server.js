const amqp = require('amqplib')

class RabbitmqServer {
  constructor(uri) {
    this.uri = uri;
    this.conn = null;
    this.channel = null;
  }

  async start() {
    try {
      this.conn = await amqp.connect(this.uri);
      this.channel = await this.conn.createChannel();
      
      await this.channel.assertQueue('ipag', {
        durable: true 
      });
      
      console.log('RabbitMQ connected and queue declared');
    } catch (error) {
      console.error('RabbitMQ connection error:', error.message);
    }
  }

  async publishInQueue(queue, message) {
  try {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not available');
    }
    
    await this.channel.assertQueue(queue, { durable: true });
    
    const result = await this.channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message published to queue '${queue}':`, message);
    return result;
  } catch (error) {
    console.error('Error publishing message to RabbitMQ:', error.message);
    throw error;
  }
}
}

module.exports = RabbitmqServer;