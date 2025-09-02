import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import signup from './routes/signup.js'
import signin from './routes/signin.js'
const prisma = new PrismaClient()

const app = express()

// view engine
app.set('views',"views")
app.set('view engine','ejs')



// middlewares
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
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



// routes
app.use('/signup',signup)
app.use('/signin',signin)


app.get('/',(req,res)=>{
    res.render('home')
})


const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is Listining On ${port}`);
})