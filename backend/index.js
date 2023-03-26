// here we will make express erver and impot database

// 1) importing from database.js here :-
const connectToMongo = require("./database.js");
connectToMongo();

// 2) importing cors here :-
var cors = require('cors');

// 3) making express server here :-

const express = require("express");
const app = express();

const port = 5000;

// making a middleware to log req.body
app.use(express.json());

// ) Making a midleware to use cors :-
app.use(cors())

// available routes :-
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
    console.log(`Bubble Notes backend listening at http://localhost:${port}`);
});