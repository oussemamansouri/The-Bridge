const express=require('express')
const route=express.Router()
const login_controller=require('../controllers/login_controller')




route.post('/login',(req,res)=>{
    login_controller.login(req.body.email,req.body.password)
    .then(token=>res.status(200).json({token:token}))
    .catch(err=>res.status(400).json(err))
    
    })

     

module.exports=route