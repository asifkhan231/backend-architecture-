const express = require("express")
const app = express()
const jobs = {}

app.post('/submit', (req, res) => {
    const jobId = `job:${Date.now()}`
    jobs[jobId] = 0

    updateJob(jobId, 0)
    res.end("\n\n" + jobId + "\n\n")
})

app.get("/checkstatus", (req, res) => {
    console.log(jobs[req.query.jobId])
    res.end("\n\njobId:" + jobs[req.query.jobId])
})
app.listen(8080, () => {
    console.log("server is running on port 8080")
})

const updateJob = (id, prog) => {
    jobs[id] = prog
    console.log(`update ${id} to ${prog}`)
    if (prog == 100) return;
    setTimeout(() => updateJob(id, prog + 10), 3000);
}