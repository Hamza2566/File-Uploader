import express from 'express'

const signup = express.Router()


signup.get('/',(req,res)=>{
    res.render('signup')
})
signup.post('/',(req,res)=>{
    
})



export default signup