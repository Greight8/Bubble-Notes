// we will connect to database in this file :-  moongose connection to nodejs, schema and model

const mongoose = require("mongoose");

// 1) making connection string of our database :-
const mongoURI = "mongodb://localhost:27017/bubbleNotes?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

// 2) function to connect to database :-
const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("connected to mongoose successfully");
}

module.exports = connectToMongo;