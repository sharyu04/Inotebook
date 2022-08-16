import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    const host ="http://localhost:5000";
    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes)

    //Get all notes
    const getNotes = async() => {

        console.log("In get notes")
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMGVhYWY5ZTgwNjA0ZGZlNGFiMWE1In0sImlhdCI6MTY2MDM3NzQwM30.rLn0fyFAx9937XEPpK3fSHRVPJyr2mFn8ZLcxX_JWkw"
            }
        });

        const json = await response.json();
        console.log(json);
        setNotes(json);
    }


    //Add note
    const addNote = async({title, description, tag}) => {

        console.log("In add note")
        const response = await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMGVhYWY5ZTgwNjA0ZGZlNGFiMWE1In0sImlhdCI6MTY2MDM3NzQwM30.rLn0fyFAx9937XEPpK3fSHRVPJyr2mFn8ZLcxX_JWkw"
            },
            body : JSON.stringify({title, description, tag})
        });

        const note =await  response.json();
        setNotes(notes.concat(note))
    }

    //Delete note
    const deleteNote = async(id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMGVhYWY5ZTgwNjA0ZGZlNGFiMWE1In0sImlhdCI6MTY2MDM3NzQwM30.rLn0fyFAx9937XEPpK3fSHRVPJyr2mFn8ZLcxX_JWkw"
            }
        });
        const json = await response.json();
        console.log(json)


        console.log("Deleting a note "+ id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    //Edit note
    const editNote = async(id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMGVhYWY5ZTgwNjA0ZGZlNGFiMWE1In0sImlhdCI6MTY2MDM3NzQwM30.rLn0fyFAx9937XEPpK3fSHRVPJyr2mFn8ZLcxX_JWkw"
            },
            body : JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id===id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);

    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;