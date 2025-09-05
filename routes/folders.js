import { PrismaClient } from "@prisma/client";
import express from "express";

const folders = express.Router();
const prisma = new PrismaClient();

folders.get("/",async (req, res) => {
    const folders = await prisma.folder.findMany({
  include: { files: true }
});
    console.log(folders);
    
    
    // const files = await prisma.file.findMany({
    //      include: { folder: true }
    // })
  res.render("folders", { folders:folders || {}})
});




folders.post("/", async (req, res) => {
  // console.log(req.body);
  const name = req.body.folderName;
  console.log(name);
  try {
    const folder = await prisma.folder.create({
      data: { name,  userId: req.user.id, },
    });
    console.log(folder);
    res.redirect('/folders')
  } catch (error) {
    console.log(error);
  }
});



































export default folders;




