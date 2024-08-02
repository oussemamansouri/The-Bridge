const express=require('express')
const route=express.Router()
const db=require('../models')
const formateur_controller=require('../controllers/formateur_controller')
// const jwt=require('jsonwebtoken')
// require('dotenv').config()
const path=require('path')





//////////////////////////////  register api start here ///////////////////////////////////////////////:

route.post('/register', formateur_controller.upload, (req, res) => {

    const defaultImg = 'assets/image/default-image.jpg';
    let imgPath = defaultImg;
    if (req.files && req.files['img'] && req.files['img'][0]) { // Vérifie si une image a été téléchargée
        imgPath = req.files['img'][0].path;
    }
    
    const defaultCv = 'assets/image/default-cv-image.jpg';
    let cvPath = defaultCv;
    if (req.files && req.files['cv'] && req.files['cv'][0]) { // Vérifie si un cv a été téléchargé
        cvPath = req.files['cv'][0].path;
    }


formateur_controller.register(req.body.firstname,req.body.lastname,req.body.email,req.body.password,imgPath,req.body.tel,req.body.dob,req.body.address,cvPath,req.body.portfolio,req.body.statu,req.body.linkedin,req.body.niveau,req.body.experience)
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(400).json(err))     

})




//////////////////////////////////   update password api start here     //////////////////////////////////////////

route.patch('/updatepassword/:id', (req, res) => {
    formateur_controller.updatepassword(
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
    formateur_controller.updateprofile(req.body.firstname,req.body.lastname,req.body.dob,req.body.address,
    req.body.tel,req.body.portfolio,req.body.statu,req.body.linkedin,req.body.niveau,req.body.experience,req.params.id)
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(400).json(err))
    })


    route.patch('/updateimage/:id', formateur_controller.uploadimg, (req, res) => {
        formateur_controller.updateimage(req.file.path, req.params.id)
          .then(response => res.status(200).json(response))
          .catch(err => res.status(400).json(err))
      })


      route.patch('/updatecv/:id', formateur_controller.uploadcv, (req, res) => {
        formateur_controller.updatecv(req.file.path, req.params.id)
          .then(response => res.status(200).json(response))
          .catch(err => res.status(400).json(err))
      })




    route.delete('/deleteprofile/:id', formateur_controller.DeleteProfile)


    route.get('/profiles',(req,res,next)=>{

        db.Formateur.findAll()
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        
        })


        route.get('/profile/:id',(req,res)=>{ 

            db.Formateur.findOne({where:{id:req.params.id}})
            .then((response)=>res.status(200).json(response))
            .catch((err)=>res.status(400).json(err))
            
            })

            route.patch('/buyPoints/:id/:points',(req,res)=>{ 

              formateur_controller.buyPoints(req.params.id,req.params.points)
              .then((response)=>res.status(200).json(response))
              .catch((err)=>res.status(400).json(err))
              
              })

module.exports=route