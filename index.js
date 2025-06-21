const express = require("express");
const app = express();
let count = 0;

app.get("/admin", function(req, res) {
    res.json({
        "Total number of request to the server were": count
    })
})

app.use(function(req, res, next) {
    count++;
    console.log("Request Received");
    console.log("Method was " + req.method);
    console.log("Host was " + req.hostname);
    console.log("URL was " + req.url);
    console.log("Time Stamp was " + new Date());
    next();
})

app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
})

app.get("/multiply", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;

    res.json({
        ans: a * b
    })
})

app.get("/divide", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;

    res.json({
        ans: a / b
    })
})

app.get("/substract", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a - b
    })
})

app.get("/add/:a/:b", function(req, res) {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);   

    res.json({
        ans: a + b
    })
})

app.listen(3000);
