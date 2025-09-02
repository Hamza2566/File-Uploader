import express from 'express'
import validateRegister from '../middleware/validator.js'
import { validationResult } from 'express-validator'
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";

const signup = express.Router()
const prisma = new PrismaClient()


signup.get('/',(req,res)=>{
    res.render('signup',{errors: []})
})
signup.post('/',validateRegister, async  (req,res)=>{
    const {username,email,password} = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render( "signup",{errors: errors.array() });
    }
     const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    console.log("Hashed password:", hashedpassword);
    
    try {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedpassword,
    }
  });
   return res.redirect('/folders')
   

} catch (error) {
  console.error(error);
  res.status(400).json({ error: "Could not create user", details: error.message });
}

})



export default signup



