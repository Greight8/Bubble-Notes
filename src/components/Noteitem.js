import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alert/alertContext';
import darkContext from '../context/darkmode/darkContext';

const Noteitem = (props) => {
    // getting notes from context api
    const context3 = useContext(darkContext);
    const { mode } = context3;

    // getting alert from context api
    const context2 = useContext(alertContext);
    const { showAlert } = context2;

    // getting notes from context api
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { title, description, note, updateNote } = props;

    return (
        <div className='col-md-4'>
            <div className="card my-3" style={{ backgroundColor: mode === "light" ? "white" : " rgb(202 233 246)", border: "1px solid black", borderRadius: "18px" }}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <div className="d-flex justify-content-end">
                        <i className="fa-solid fa-trash mb-2 mx-1" onClick={() => {
                            deleteNote(note._id);
                            showAlert("  deleted successfully", "success")
                        }}>
                        </i>
                        <i className="fa-solid fa-user-pen mx-2 mb-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
