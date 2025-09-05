import express from 'express'
import multer from 'multer';
import path from "path";
import fs from "fs";
import crypto from "crypto";

const uploads = express.Router()
fs.mkdirSync("uploads", { recursive: true });

// 2) Initialize storage engine (decides WHERE and HOW files are stored)
const storage = multer.diskStorage({
  // 2.1) Choose destination folder
  destination: (req, file, cb) => {
    cb(null, "uploads"); // all files go into "uploads" folder
  },

  // 2.2) Decide filename for the file
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // get extension (.png, .jpg, etc.)
    const uniqueName = crypto.randomUUID() + ext; // generate safe unique name
    cb(null, uniqueName);
  },
});
// 3) Configure Multer middleware
const upload = multer({
  storage, // use our storage engine
  limits: { fileSize: 5 * 1024 * 1024 }, // limit: 5MB max
  fileFilter: (req, file, cb) => {
    // 3.1) Accept only images
    const allowed = /png|jpg|jpeg|webp/;
    const isOk = allowed.test(file.mimetype);
    cb(isOk ? null : new Error("Only images allowed"), isOk);
  },
});







uploads.post("/", upload.single("avatar"), (req, res) => {
  console.log("req.file:", req.file);
  console.log("req.body:", req.body);
  res.json({ file: req.file, fields: req.body });
});









export default uploads