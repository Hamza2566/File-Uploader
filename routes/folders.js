import express from 'express'

const folders = express.Router()


folders.get('/',(req,res)=>{
    res.render('folders',{user:req.user.username})
    
    
})



export default folders