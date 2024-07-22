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

//////////////////////////////////   register api start here     //////////////////////////////////////////



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


            
//////////////////////////////   verify token client

// verifytokenadmin=(req,res,next)=>{

//     let token=req.headers.authorization
//     let role=req.headers.role
//     if(!token || role!='admin'){
//         res.status(400).json({msg:'access rejected....!!!!'})
//     }
    
//     try{
//         jwt.verify(token,process.env.PRIVATKEY)
//         next()
//     }catch(e){
//     res.status(400).json({msg:e})
//     }
    
//     }


/////////////////////////////////////// verify keys

// var key1=process.env.KEY1
// var key2=process.env.KEY2

// verifykey=(req,res,next)=>{

//     let pk=req.query.key1
//     let ck=req.query.key2

// if(pk==key1 && ck==key2 ){
//     next()
// }else{
//     res.status(400).json({error:"you can't access this route because you don't send me the keys i need !!!"})
// }

// }



            


module.exports = route