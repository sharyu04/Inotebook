import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    const host ="http://localhost:5000";
    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes)

    //Get all note
    // const getNotes = async() => {

    //     console.log("In get notes");
    //     const response = await fetch(`${host}/api/notes/fetchallnotes`,{
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMGVhYWY5ZTgwNjA0ZGZlNGFiMWE1In0sImlhdCI6MTY2MDU5NTkxNX0.zEOsljCGn2eOyGtVQjjBNXPlQNx5rEPR3s5KEiRsVZY"
    //         }
    //     });

    //     const json = await response.json()
    //     console.log(json)
    //     // setNotes();
    // }

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
        // setNotes();
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

        const json = response.json();
        const note = {
            "_id": "62f9fe92a7a4fc0578b3d1287",
            "user": "62f0eaaf9e80604dfe4ab1a5",
            "title": title,
            "description": description,
            "tag": tag,
            "timestamp": "2022-08-15T08:06:42.122Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    //Delete note
    const deleteNote = (id) => {
        console.log("Deleting a note "+ id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    //Edit note
    const editNote = async(id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMGVhYWY5ZTgwNjA0ZGZlNGFiMWE1In0sImlhdCI6MTY2MDM3NzQwM30.rLn0fyFAx9937XEPpK3fSHRVPJyr2mFn8ZLcxX_JWkw"
            },
            body : JSON.stringify({title, description, tag})
        });
        const json = response.json();

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id===id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }

    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;