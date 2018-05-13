const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const tools = require("../data/tools");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/tools", (req, res) => {
    res.json(tools);
});

app.post("/api/tools", (req, res) => {
    const surveyResults = req.body.scores;
    const reduceToDiff = (acc, curVal, i) => acc + Math.abs(curVal - surveyResults[i]);
    const reduceToClosest = (acc, curVal, i) => {
        const diff = curVal.scores.reduce(reduceToDiff, 0);
        if (diff < acc[0]) {
            return [diff, i];
        }
        return acc;
    };
    const recommendedToolIndex = tools.reduce(reduceToClosest, [50, -1])[1];
    return res.json(tools[recommendedToolIndex]);
});

module.exports = app;
