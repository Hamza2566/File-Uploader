import { PrismaClient } from "@prisma/client";
import express from "express";

const folders = express.Router();
const prisma = new PrismaClient();

folders.get("/",async (req, res) => {
    
    const folders = await prisma.folder.findMany({
  where: { userId: req.user.id },
  include: { files: true }
});
  res.render("folders", { user: req.user?.username || null , folders:folders});
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




