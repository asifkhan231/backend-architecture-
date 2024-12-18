const  http = require("http")
const WebServer = require("websocket").server
const connections = []

const httpServer = http.createServer()

const websocket = new WebServer({"httpServer":httpServer})

httpServer.listen(8080,()=> console.log("server is listening on port 8080"))

websocket.on("request", request => {
    const connection = request.accept(null,request.origin)

    connection.on("message",message => {
        //when someone send a message it will goes to everyone
        console.log(connection.socket.remotePort)
        connections.forEach(c => c.send(`user ${connection.socket.remotePort} says: ${message.utf8Data} `)    );
    })

    connections.push(connection)

    connections.forEach(c => c.send(`new user ${connection.socket.remotePort} is connected`))
})