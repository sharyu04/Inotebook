import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const handleClick = (e) => {
    e.preventDefault();
    addNote({title: note.title, description: note.description, tag: note.tag});
    setNote({ title: "", description: "", tag: "" });
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className='container my-3' style={{backgroundColor: 'white', padding:'25px',borderRadius:'40px'}}>
      <h2>Add a note</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" style={{fontSize:"20px"}}>Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label" style={{fontSize:"20px"}}>Description</label>
          <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label" style={{fontSize:"20px"}}>Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick} style={{fontWeight: "bold"}}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote