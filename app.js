import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import express from 'express'
import session from 'express-session'
import passport from "./config/passport.js"; 
import signup from './routes/signup.js'
import signin from './routes/signin.js'
import folders from './routes/folders.js'
import files from './routes/files.js';
import multer from 'multer';
import path from "path";
import fs from "fs";
import crypto from "crypto";







const prisma = new PrismaClient()

const app = express()
// 1) Make sure an "uploads" folder exists
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


// view engine
app.set('views',"views")
app.set('view engine','ejs')



// middlewares
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use("/uploads", express.static("uploads"));

app.use(express.json())
//session config
app.use(session({
    secret: process.env.SESSION_SECRET || 'change_this_secret',  
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000,  
    }),  
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,  
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    },  
}));  
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  res.locals.currentuser = req.user || null;
  next();
});
// 5) Handle Multer errors globally
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors (size, unexpected field, etc.)
    return res.status(400).json({ error: err.code });
  }
  if (err) {
    // Any other error
    return res.status(400).json({ error: err.message });
  }
  next();
});

// routes
app.use('/signup',signup)
app.use('/signin',signin)
app.use('/folders',folders)
app.use('/folder',files)


app.get('/',(req,res)=>{
    res.render('home')
})


// 4) Create route to handle file upload
app.post("/upload", upload.single("avatar"), async(req, res) => {
  // 4.1) Multer puts file info in req.file
  // 4.2) Text fields (username, etc.) go into req.body
  res.json({
    message: "File uploaded successfully!",
    file: req.file,
    fields: req.body,
  });
  const name  = req.file.filename
  const url = req.file.path
  const id = req.user.id
  
  try {
    const folderID = await prisma.folder.findFirst({
      where:{userId : Number(id)}
    })
    const folderId = folderID.id
    
    const newfile = await  prisma.file.create({
      data:{
        name,
        url,
        id,
        folderId
      }
    })
    
    console.log(newfile);
    
  } catch (error) {
    console.log(error);
    
  }
  
});


const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is Listining On ${port}`);
})