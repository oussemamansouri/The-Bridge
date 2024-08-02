const express= require('express')
const route=express.Router()
const db=require('../models')
const admin_controller=require('../controllers/admin_controller')
// const jwt=require('jsonwebtoken')
// require('dotenv').config()
const path=require('path')


//////////////////////////////  register api start here ///////////////////////////////////////////////:

route.post('/register', admin_controller.upload, (req, res) => {

    const imgPath = 'assets/image/default-image.jpg';

    admin_controller.register(req.body.username,req.body.email,req.body.password,imgPath,req.body.tel)
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(400).json(err))     
    
})

//////////////////////////////////   update password api start here     //////////////////////////////////////////

route.patch('/updatepassword/:id', (req, res) => {
    admin_controller.updatepassword(
      req.body.oldPassword,
      req.body.newPassword,
      req.body.repeatPassword,
      req.params.id
    )
      .then(response => res.status(200).json(response))
      .catch(err => res.status(400).json(err))
  })
//////////////////////////////////   update password api end here     //////////////////////////////////////////

    route.patch('/updateprofile/:id',(req,res)=>{
        admin_controller.updateprofile(req.body.username,req.body.email,req.body.tel,req.params.id)
        .then(response=>res.status(200).json(response))
        .catch(err=>res.status(400).json(err))
    })


    route.patch('/updateimage/:id', admin_controller.uploadimg, (req, res) => {
        admin_controller.updateimage(req.file.path, req.params.id)
          .then(response => res.status(200).json(response))
          .catch(err => res.status(400).json(err))
      })

    route.get('/profile',(req,res,next)=>{ 

        db.Admin.findOne()
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        
        })


module.exports = route