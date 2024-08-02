const express=require('express')
const route=express.Router()
const db=require('../models')
const moderateur_controller=require('../controllers/moderateur_controller')
// const jwt=require('jsonwebtoken')
// require('dotenv').config()
const path=require('path')





//////////////////////////////  register api start here ///////////////////////////////////////////////:

route.post('/register', moderateur_controller.upload, (req, res) => {

const defaultImg = 'assets/image/default-image.jpg';
let imgPath = defaultImg;
    if (req.files && req.files['img'] && req.files['img'][0]) { // Vérifie si une image a été téléchargée
        imgPath = req.files['img'][0].path;
    }

    moderateur_controller.register(req.body.firstname,req.body.lastname,req.body.username,req.body.email,req.body.password,imgPath,req.body.tel)
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(400).json(err))     
    
})

route.delete('/deleteprofile/:id',moderateur_controller.DeleteProfile)


route.get('/profiles',(req,res,next)=>{ 

    db.Moderateur.findAll()
    .then((response)=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
    
})


    route.get('/profile/:id',(req,res,next)=>{ 

        db.Moderateur.findOne({where:{id:req.params.id}})
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        
    })


route.patch('/updateprofile/:id',(req,res)=>{
    moderateur_controller.updateprofile(req.body.firstname,req.body.lastname,req.body.username,req.body.email,req.body.tel,req.params.id)
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(400).json(err))
})



//////////////////////////////////   update password api start here     //////////////////////////////////////////

route.patch('/updatepassword/:id', (req, res) => {
    moderateur_controller.updatepassword(
      req.body.oldPassword,
      req.body.newPassword,
      req.body.repeatPassword,
      req.params.id
    )
      .then(response => res.status(200).json(response))
      .catch(err => res.status(400).json(err))
  })
//////////////////////////////////   update password api end here     //////////////////////////////////////////


  

    route.patch('/updateimage/:id', moderateur_controller.uploadimg, (req, res) => {
        moderateur_controller.updateimage(req.file.path, req.params.id)
          .then(response => res.status(200).json(response))
          .catch(err => res.status(400).json(err))
      })

module.exports=route