import { PrismaClient } from '@prisma/client';
import express from 'express'


const prisma = new PrismaClient()
const files = express.Router()



files.get("/:id",async(req,res)=>{
   const id = Number(req.params.id)
    const folders = await prisma.folder.findMany({
  where: { id: id},
  include: { files: true }
});

   const file = await prisma.file.findMany({
      where:{folderId:id},
      include:{folder:true},
   })
  res.render("partials/files", { folders:folders || {} })
})


export default files