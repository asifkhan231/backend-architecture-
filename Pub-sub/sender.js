const amqplib = require('amqplib')

const msg = {number:process.argv[2]}

connect()
async function connect() {
    try{
        const amqpServer = "amqps://oepqkgnx:m4dW8Il84i_mTIf-pP5wKtHc01Vrsby9@puffin.rmq2.cloudamqp.com/oepqkgnx"
        const connection = await amqplib.connect(amqpServer)
        const channel = await connection.createChannel()
        await channel.assertQueue("jobs")
        await channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg)))
        console.log(`job sent successfully ${msg.number}`)
        await channel.close()
        await connection.close()
    }catch(ex){
        console.log(ex)
    }
}