import { PrismaClient } from '@prisma/client';
import express from 'express'


const files = express.Router()
const prisma = new PrismaClient()



files.post('/files',async(req,res)=>{
    console.log(req.body);
    const folderId = req.body.folderId
    const files = await prisma.file.findMany({
         where: { id: Number(folderId) },
         include: { folder: true }
    })
    console.log(files);
    
    res.render("partials/files",{files:files})
})
files.post("/postman",async(req,res)=>{

     try {
         const file = await prisma.file.create({
            data:req.body
         })
        console.log(file);
        
     } catch (error) {
        console.log(error);
     }
})


export default files