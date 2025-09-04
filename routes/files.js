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
    console.log("files",files);
    const folders = await prisma.folder.findUnique({
      where:{id: Number(folderId)}
    })
    console.log("folders in files",folders);
    res.render("partials/files",{files:files , folders:folders})
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