const amqplib = require('amqplib')

const msg = {number:process.argv[2]}

connect()
async function connect() {
    try{
        const amqpServer = "amqps://oepqkgnx:m4dW8Il84i_mTIf-pP5wKtHc01Vrsby9@puffin.rmq2.cloudamqp.com/oepqkgnx"
        const connection = await amqplib.connect(amqpServer)
        const channel = await connection.createChannel()
        await channel.assertQueue("jobs")
      
        channel.consume("jobs",message=>{
            const input = JSON.parse(message.content.toString())
            console.log(`recieve job with input ${input.number}`)

            if(input.number == 7){
                channel.ack(message)
            }
        })

        console.log('waiting for the message.....')
    }catch(ex){
        console.log(ex)
    }
}