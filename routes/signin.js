import express from 'express'
import passport from "../config/passport.js"; 



const signin = express.Router()


signin.get('/',(req,res)=>{
    res.render('signin')
})

signin.post('/',
     passport.authenticate("local",{
            successRedirect:'/folders',
            failureRedirect:"/signin",
      })
)


export default signin