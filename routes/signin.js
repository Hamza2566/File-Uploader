import express from 'express'

const signin = express.Router()


signin.get('/',(req,res)=>{
    res.render('signin')
})



export default signin