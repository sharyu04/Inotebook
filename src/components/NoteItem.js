import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note , updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title" style={{
                            fontFamily: "Poor Story,cursive",fontSize: "30px",
                            fontWeight: "bold"
                            }}>{note.title}</h5>
                        <p className="card-text" style={{fontFamily: "Poor Story,cursive",fontSize: "25px"}}>{note.description}</p>
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => {deleteNote(note._id)}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {updateNote(note)}}></i>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem