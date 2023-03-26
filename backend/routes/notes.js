// here we will make routes for fetching notes from database

const express = require("express");
const router = express.Router();
const Notes = require("../Mongoose-Models/Notes");

// importing fetchuser middleware :-
const fetchuser = require("../middleware/fetchuser");

// a) importing express-validator here :-
const { body, validationResult } = require('express-validator');


// 1) Route 1 :- Getting all the notes using "get" on end point "/api/notes/fetchallnotes"
// login is required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});

// 2) Route 2 :- Adding notes in db notes using "get" on end point "/api/notes/addnote"
// login is required 
router.post("/addnote", fetchuser, [
    body('title', 'Please enter a Title').isLength({ min: 1 }),
    body('description', 'Add a descriptionm').isLength({ min: 1 })
], async (req, res) => {

    try {
        // a) if there are errors , return bad rquest and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // b) if there are no errors save it inside our collection "notes"
        const { title, description, tag } = req.body;

        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);


    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});

// 3) Route 3 :- Updating an existing note using "put" on end point "/api/notes/updatenote"
// login is required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // a) create a new note
        const newNote = {};

        // b) agar user ne title dia hai to it must be present and must return true , we will put it inside newNote object
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        // c) now find the note we want to update by its id 
        let note = await Notes.findById(req.params.id);

        // d) what if note dosent exist and we are trying to update it
        if (!note) {
            return res.status(404).send("Not Found")
        };

        // e) now checking if the user who is logged in is updating its own note or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // f) now everything looks good lets update the existing note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }

});


// 4) Route 4 :- Deleting an existing note using "delete" on end point "/api/notes/deletenote"
// login is required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // a) now find the note we want to delete by its id 
        let note = await Notes.findById(req.params.id);

        // d) what if note dosent exist and we are trying to delete it
        if (!note) {
            return res.status(404).send("Not Found")
        };

        // e) now checking if the user who is logged in is deleting its own note or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // f) now everything looks good lets delete the existing note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "note is deleted", note: note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});

module.exports = router;