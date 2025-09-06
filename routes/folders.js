import { PrismaClient } from "@prisma/client";
import express from "express";

const folders = express.Router();
const prisma = new PrismaClient();

folders.get("/",async (req, res) => {
   const showWelcome = req.session.showWelcome;
  req.session.showWelcome = false; 

    const folders = await prisma.folder.findMany({
  include: { files: true }
});
  res.render("folders", { folders:folders || {} , showWelcome})
});




folders.post("/", async (req, res) => {
  // console.log(req.body);
  const name = req.body.folderName;
  console.log(name);
  try {
    const folder = await prisma.folder.create({
      data: { name,  userId: req.user.id, },
    });
    res.redirect('/folders')
  } catch (error) {
    console.log(error);
  }
});

folders.get("/delete/:id",async(req,res)=>{
  console.log(req.params.id);
  const folderId = Number(req.params.id)
try {
  const deletefolder = await prisma.folder.delete({
    where:{id:folderId}
  })
  res.redirect("/folders")
} catch (error) {
  console.log(error);
}
})
folders.get("/edit/:id",async(req,res)=>{
  const folderId = Number(req.params.id)
  console.log(folderId);
  //  try {
    
  //  } catch (error) {
    
  //  }
})


































export default folders;




