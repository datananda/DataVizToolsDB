const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "home.html"));
});

app.get("/find", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "find.html"));
});

module.exports = app;
