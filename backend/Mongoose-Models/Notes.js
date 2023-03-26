// in this folder we will make schema for storing our notes :-

const mongoose = require("mongoose");
const { Schema } = mongoose;

// 1) making a schema
const NotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// schema NotesSchema ko humne confirm kr dia aur isse ek model me convert kr dia
// notes is the collection
// NotesSchema is the name of the schema
module.exports = mongoose.model("notes", NotesSchema);