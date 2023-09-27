import express from "express";
import helmet from "helmet";
import { getNote,getNotes,createNote } from "./database.js"; 
const application = express()

application.use(express.json())
application.use(helmet())

application.get('/notes',async (request,response)=>{
    const notes = await getNotes()
    response.send(notes)
})
application.get('/note/:id',async (request,response)=>{
    const id =request.params.id
    const note = await getNote(id)
    response.send(note)
})
application.post('/create-notes',async (request,response)=>{
    const {title,contents}= request.body
    const note = await createNote(title,contents)
    response.send(note)
})

application.use((error,request,response,next)=>{
    console.error(error.stack)
    response.status(500).send('Something happen wrong')
})
application.listen(8000,()=>{
    console.log(`Server is running on port 8000`);
})