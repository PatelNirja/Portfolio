const express = require("express");
const app = express();


app.use((req, res, next) => {
    console.log("Middleware Executed");
    next();
});

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.get("/projects", (req, res) => {
    res.json([
        {
            id: 1,
            title: "SmartJar"
        }, {
            id: 2,
            title: "CUDAS"
        }
    ]);
});

app.get("/about", (req, res) => {
    res.json({
        "name" : "Nirja",
        "College" : "VGEC"
    })
})

module.exports = app;