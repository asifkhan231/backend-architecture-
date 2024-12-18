const express = require("express")
const app = express()
const jobs = {}

app.post('/submit', (req, res) => {
    const jobId = `job:${Date.now()}`
    jobs[jobId] = 0

    updateJob(jobId, 0)
    res.end("\n\n" + jobId + "\n\n")
})

app.get("/checkstatus", async (req, res) => {
    console.log(jobs[req.query.jobId])

    while(await checkJobUpdate(req.query.jobId) === false)
    res.end("\n\njobStatus: complete" + jobs[req.query.jobId])
})
app.listen(8080, () => {
    console.log("server is running on port 8080")
})

async function checkJobUpdate(jobId) {
    return new Promise((resolve,reject)=>{
        if(jobs[jobId]<100){
            setTimeout(()=> resolve(false),1000)
        }
        else{
            resolve(true)
        }
    })
}

const updateJob = (id, prog) => {
    jobs[id] = prog
    console.log(`update ${id} to ${prog}`)
    if (prog == 100) return;
    setTimeout(() => updateJob(id, prog + 10), 3000);
}