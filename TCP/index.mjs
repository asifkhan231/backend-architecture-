import net from 'net'

const server = net.createServer(socket => {
    console.log(`TCP handshake successful with:${socket.remoteAddress}:${socket.remotePort}`)

    socket.write('hello from server!')
    socket.on('data', data => {
        console.log(`data reveiced : ${data.toString()}`)
    })
})

server.listen(8080,'127.0.0.1')
