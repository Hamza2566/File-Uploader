import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import express from 'express'
import session from 'express-session'
import passport from "./config/passport.js"; 
import signup from './routes/signup.js'
import signin from './routes/signin.js'
import folders from './routes/folders.js'
const prisma = new PrismaClient()

const app = express()

// view engine
app.set('views',"views")
app.set('view engine','ejs')



// middlewares
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
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
        // maxAge: 7 * 24 * 60 * 60 * 1000,  
        maxAge: 20000,
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

// routes
app.use('/signup',signup)
app.use('/signin',signin)
app.use('/folders',folders)


app.get('/',(req,res)=>{
    res.render('home')
})

app.post("/folders/files", async (req, res) => {
//   const folderId = Number(req.body.folderId);
  console.log(req.body);
  

//   const folder = await prisma.folder.findUnique({
//     where: { id: folderId },
//     include: { files: true }
//   });

//   res.render("partials/files", { folder });
});



const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is Listining On ${port}`);
})