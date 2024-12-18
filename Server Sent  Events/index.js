const app = require('express')()

const port = 8080
app.get('/',(req,res)=> res.send('Hello world'))

app.get('/stream',(req,res)=> {
    res.setHeader("Content-Type","text/event-stream")
    send(res)
})

let i = 0;

function send(res){
    //here a response starting with "data: " and ends with \n\n this indicates it as a message response 
res.write("data: "+ `hello  from server ---- [${i++}]\n\n`)

setTimeout(() => send(res), 1000);
}

app.listen(port)
console.log(`server is running on ${port}`)
