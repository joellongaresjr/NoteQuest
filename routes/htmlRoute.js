const path = require('path');
const express = require("express")
const htmlRouter = express.Router();


htmlRouter.get("/", (req, res) => { 
    res.sendfile(path.join(__dirname, "/index.html"));
});

htmlRouter.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/notes.html"));
});

module.exports = htmlRouter;