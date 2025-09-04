import { PrismaClient } from '@prisma/client';
import express from 'express'


const prisma = new PrismaClient()
const files = express.Router()



files.get("/:id",async(req,res)=>{
   console.log("this is the id for the file",req.params.id);
   const id = Number(req.params.id)
   const file = await prisma.file.findMany({
      where:{folderId:id},
      include:{folder:true},
   })
   console.log("this is the file",file);
})


export default files