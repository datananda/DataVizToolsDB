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
    const reduceToDiff = (acc, curVal, i) => acc + Math.abs(curVal - newFriend.scores[i]);
    const reduceToClosest = (acc, curVal, i) => {
        const diff = curVal.scores.reduce(reduceToDiff, 0);
        if (diff < acc[0]) {
            return [diff, i];
        }
        return acc;
    };
    const closestFriendIndex = friends.reduce(reduceToClosest, [50, -1])[1];
    friends.push(newFriend);
    return res.json(friends[closestFriendIndex]);
});

module.exports = app;
