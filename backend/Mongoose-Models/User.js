// in this folder we will make schema for email singnup/ login of our users :-

const mongoose = require("mongoose");
const { Schema } = mongoose;

// 1) making a schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// schema UserSchema ko humne confirm kr dia aur isse ek model me convert kr dia
// user is the collection which will be changed to users
// UserSchema is the name of the schema

module.exports = mongoose.model("user", UserSchema);