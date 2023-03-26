import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alert/alertContext';
import darkContext from '../context/darkmode/darkContext';
import { useNavigate } from 'react-router-dom';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    // getting notes from context api
    const context3 = useContext(darkContext);
    const { mode } = context3;

    // getting alert from context api
    const context2 = useContext(alertContext);
    const { showAlert } = context2;

    // getting notes from context api
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    // making useNavigate hook to redirect
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        }
        else {
            navigate("/login", { replace: true });
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    // making a state for this component only
    const [myNote, setMyNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setMyNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    // brought it from AddNote.js
    const handleAddMyNote = () => {
        editNote(myNote.id, myNote.etitle, myNote.edescription, myNote.etag);
        ref.current.click();
        showAlert("  updated successfully", "success");
    }

    const onChange = (e) => {
        setMyNote({ ...myNote, [e.target.name]: e.target.value });
    }

    return (
        <>
            {/* 6th component AddNote */}
            <AddNote />

            {/* 7th component Modal */}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: mode === "light" ? "white" : "rgb(17 24 39)", borderRadius: "20px" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{ color: mode === "light" ? "black" : "white" }}>Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* adding form here to edit */}
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label" style={{ color: mode === "light" ? "black" : "white", fontStyle: "italic" }}>Title</label>
                                    <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" name="etitle" value={myNote.etitle} onChange={onChange} minLength={1} required style={{ backgroundColor: mode === "light" ? "white" : "rgb(202 233 246)", border: "1px solid black", borderRadius: "15px" }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label" style={{ color: mode === "light" ? "black" : "white", fontStyle: "italic" }}>Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={myNote.edescription} onChange={onChange} minLength={1} required style={{ backgroundColor: mode === "light" ? "white" : "rgb(202 233 246)", border: "1px solid black", borderRadius: "15px" }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label" style={{ color: mode === "light" ? "black" : "white", fontStyle: "italic" }}>Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={myNote.etag} onChange={onChange} minLength={1} required style={{ backgroundColor: mode === "light" ? "white" : "rgb(202 233 246)", border: "1px solid black", borderRadius: "15px" }} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose} style={{ borderRadius: "12px" }}>Close</button>
                            <button disabled={myNote.etitle.length < 1 || myNote.edescription.length < 1} type="button" className="btn btn-primary" onClick={handleAddMyNote} style={{ borderRadius: "12px" }}>Update</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="my-3">
                <h2 className='mb-5 mt-4 text-center' style={{ color: mode === "light" ? "black" : "white" }}>My Notes</h2>
                <div className='row'>
                    {/* a) view note in our dom */}
                    <div className="container">
                        {notes.length === 0 && "view your notes here"}
                    </div>
                    {notes.map((note) => {
                        // eslint-disable-next-line
                        {/* 5) 5th component Noteitem */ }
                        return <Noteitem key={note._id} note={note} title={note.title} description={note.description} updateNote={updateNote} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
