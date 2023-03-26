import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  // making a state note where we will get notes from db, user both.
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const host = "http://localhost:5000";

  // b) fetch all notes 
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  }

  // c) Add a Note :-
  const addNote = async (title, description, tag) => {
    // using API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag })
    });
    
    // logic to add note
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  // d) Delete a Note :-
  const deleteNote = async (id) => {
    // using API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      }
    });
    const json = await response.json();
    console.log(json);

    // logic to delet a particular note from frontend
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // e) Edit a Note :-
  const editNote = async (id, title, description, tag) => {
    // using API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);

    // logic to edit a particular note
    // let newNotes = JSON.parse(JSON.stringify(notes))
    // for (let index = 0; index < newNotes.length; index++) {
    //   const element = newNotes[index];

    //   if (element._id === id) {
    //     newNotes[index].title = title
    //     newNotes[index].description = description
    //     newNotes[index].tag = tag
    //     break;
    //   };
    // }
    // // console.log(notes);
    // setNotes(newNotes);
    getNotes();
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;