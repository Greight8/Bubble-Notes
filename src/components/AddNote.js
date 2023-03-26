import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alert/alertContext';
import darkContext from '../context/darkmode/darkContext';

const AddNote = () => {
  // getting darkmode from context api
  const context3 = useContext(darkContext);
  const { mode } = context3;

  // getting alert from context api
  const context2 = useContext(alertContext);
  const { showAlert } = context2;

  // getting notes from context api
  const context = useContext(noteContext);
  const { addNote } = context;

  // making a state for this component only
  const [myNote, setMyNote] = useState({ title: "", description: "", tag: "" });

  const handleAddMyNote = (e) => {
    e.preventDefault();
    addNote(myNote.title, myNote.description, myNote.tag);
    setMyNote({ title: "", description: "", tag: "" });
    showAlert("  added successfully", "success");
  }

  const onChange = (e) => {
    setMyNote({ ...myNote, [e.target.name]: e.target.value });
  }

  return (
    <div className='container my-3'>
      <h2 className='mb-4 mt-1 text-center' style={{ color: mode === "light" ? "black" : "white" }}>Add a note</h2>
      {/* Adding a form here */}
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label mx-5" style={{ color: mode === "light" ? "black" : "white", fontStyle: "italic" }}>Title</label>
          <input type="text" className="form-control mx-5 mb-5" id="title" aria-describedby="emailHelp" name="title" value={myNote.title} onChange={onChange} minLength={1} required style={{ backgroundColor: mode === "light" ? "white" : "rgb(202 233 246)", border: "1px solid black", width: "530px", borderRadius: "15px" }} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label mx-5" style={{ color: mode === "light" ? "black" : "white", fontStyle: "italic" }}>Description</label>
          <input type="text" className="form-control mx-5  mb-5" id="description" name='description' value={myNote.description} onChange={onChange} minLength={1} required style={{ backgroundColor: mode === "light" ? "white" : "rgb(202 233 246)", border: "1px solid black", width: "530px", borderRadius: "15px" }} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label mx-5" style={{ color: mode === "light" ? "black" : "white", fontStyle: "italic" }}>Tag</label>
          <input type="text" className="form-control mx-5" id="tag" name='tag' value={myNote.tag} onChange={onChange} minLength={1} required style={{ backgroundColor: mode === "light" ? "white" : "rgb(202 233 246)", border: "1px solid black", width: "530px", borderRadius: "15px" }} />
        </div>
        <button disabled={myNote.title.length < 1 || myNote.description.length < 1} type="submit" className="btn btn-info mx-5 mt-3" style={{ borderRadius: "12px" }} onClick={handleAddMyNote}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
