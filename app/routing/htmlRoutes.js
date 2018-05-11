const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "home.html"));
});

app.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "survey.html"));
});

module.exports = app;
