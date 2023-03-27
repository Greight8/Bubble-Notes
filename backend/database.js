// we will connect to database in this file :-  moongose connection to nodejs, schema and model

const mongoose = require("mongoose");

// 1) making connection string of our database :-
const mongoURI = "mongodb+srv://dhruvbhatnagar4:dstar@bubble-notes.xvausck.mongodb.net/?retryWrites=true&w=majority";

// 2) function to connect to database :-
const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("connected to mongoose successfully");
}

module.exports = connectToMongo;