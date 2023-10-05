import {insertDb , saveDB , getDB } from "./src/db.js"


export const newNote = async (note , tags ) => {
    const newNote= {
        content:note,
        tags,
        id:Date.now()
    }
    await insertDb(newNote)
    return newNote;
}

export const getAll = async () => {
   const {notes} = await getDB();
   return notes;
}


//probably not working solve as a assignment
export const findNotes = async(filter) => {
    const notes = await getAll()
    return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()))
}

export const removeNote = async (id) => {
    const {notes} = await getDB();
    const match = notes.find(note => note.id === id);
    if(match){
        const newNotes = notes.filter(note => note.id !== id )
        await saveDB({notes: newNotes})
        return id;
    }
}

export const removeAllNotes = async () => saveDB({notes:[]})