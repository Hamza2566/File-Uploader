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
  res.render("partials/files", { folders:folders || {} })
})
files.get("/delete/:id",async(req,res)=>{
     const fileId = Number(req.params.id);
  const folderId = Number(req.query.folderId);
  const deletedFile = await prisma.file.deleteMany({
    where: {
      id:fileId,
      folderId:folderId,
    },
  });
  res.redirect("/folders")
})
export default files