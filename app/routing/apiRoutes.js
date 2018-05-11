const express = require("express");
const bodyParser = require("body-parser");
const friends = require("../data/friends");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/friends", (req, res) => {
    res.json(friends);
});

app.post("/api/friends", (req, res) => {
    const newFriend = req.body;
    const friend1 = friends[0];
    const reducer = (acc, curVal, i) => acc + Math.abs(curVal - newFriend.scores[i]);
    const friend1diff = friend1.scores.reduce(reducer, 0);
    console.log(friend1diff);
    friends.push(newFriend);
});

module.exports = app;
