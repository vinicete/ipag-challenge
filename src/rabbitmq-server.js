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
    } catch (error) {
      console.error( error.message);
    }
  }

  async publishInQueue(queue, message) {
    
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }
}

module.exports = RabbitmqServer;