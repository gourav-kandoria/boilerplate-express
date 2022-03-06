require('dotenv').config()
var express = require('express');
var app = express();

var bp = require("body-parser");
const req = require('express/lib/request');

/*
app.get("/", function(req, res) {
    res.send("Hello Express")
});
*/

app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next();
});

app.use(bp.urlencoded({extended: false}))


var staticFilePath = __dirname + "/public";

app.use('/public', express.static(staticFilePath));

app.get("/", function(req, res) {
    var filePath = __dirname + "/views/index.html";
    res.sendFile(filePath);
});

app.get("/json", function(req, res) {
    res.json({
        "message": process.env.MESSAGE_STYLE == "uppercase" ? "HELLO JSON" : "Hello json"
    });
});

app.use("/now", function(req, res, next) {
    next(); 
});

var router = express.Router()

router.get('/', (req, res) => {
    res.json(
        {time : new Date().toDateString()} 
    )
})

router.get('/greetings', (req, res) => {
    res.json(
        {
            time : new Date().toDateString(), 
            greeting : "Hello world"
        }
    )
})

app.use("/now", router)


app.get("/:word/echo", function(req, res, next) {
    res.json({
        echo: req.params.word
    }
    )
})

app.get("/name", function(req, res) {
    res.json({
        name: `${req.query.first} ${req.query.last}`
    })
}).post("/name", function(req, res) {
    res.json({
        name: `${req.body.first} ${req.body.last}`
    })
})


module.exports = app;