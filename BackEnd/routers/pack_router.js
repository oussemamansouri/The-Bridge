const express = require('express');
const route = express.Router();
const db = require('../models');
const pack_controller = require('../controllers/pack_controller');

// Ajouter un pack
route.post('/addpack', (req, res) => {
    pack_controller.addpack(req.body.titre, req.body.description,req.body.description1,req.body.description2,req.body.description3, req.body.prix, req.body.points)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
});

// Mettre à jour un pack
route.patch('/updatepack/:id', (req, res) => {
    pack_controller.updatepack(req.body.titre, req.body.description,req.body.description1,req.body.description2,req.body.description3, req.body.prix, req.body.points, req.params.id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
});

// Supprimer un pack
route.delete('/deletepack/:id', (req, res) => {
    pack_controller.deletepack(req.params.id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
});

// Récupérer tous les packs
route.get('/packs', (req, res, next) => {
    db.Pack.findAll()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
});

// Récupérer un pack par son ID
route.get('/pack/:id', (req, res) => {
    db.Pack.findOne({ where: { id: req.params.id } })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
});

module.exports = route;





















// const express=require('express')
// const route=express.Router()
// const db=require('../models')
// const pack_controller=require('../controllers/pack_controller')



// route.post('/addpack', (req, res) => {

//     pack_controller.addpack(req.body.titre,req.body.description,req.body.prix,req.body.points)
//     .then(response=>res.status(200).json(response))
//     .catch(err=>res.status(400).json(err))     
// })


//     route.patch('/updatepack/:id',(req,res)=>{
//         pack_controller.updatepack(req.body.titre,req.body.description,req.body.prix,req.body.points,req.params.id)
//     .then(response=>res.status(200).json(response))
//     .catch(err=>res.status(400).json(err))
//     })


//     route.delete('/deletepack/:id', pack_controller.Deletepack);




 
//     route.get('/packs',(req,res,next)=>{ 

//         db.Pack.findAll({include:[db.Pack]})
//         .then((response)=>res.status(200).json(response))
//         .catch((err)=>res.status(400).json(err))
//         })


//         route.get('/pack/:id',(req,res)=>{ 

//             db.Pack.findOne({where: {id: req.params.id}, include: [db.Pack]})
//             .then((response)=>res.status(200).json(response))
//             .catch((err)=>res.status(400).json(err))
//             })






            
// //////////////////////////////   verify token client

// verifytokenclient=(req,res,next)=>{

//     let token=req.headers.authorization
//     let role=req.headers.role
//     if(!token || role!='client'){
//         res.status(400).json({msg:'access rejected....!!!!'})
//     }
    
//     try{
//         jwt.verify(token,process.env.PRIVATKEY)
//         next()
//     }catch(e){
//     res.status(400).json({msg:e})
//     }
    
//     }


// /////////////////////////////////////// verify keys

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

//  module.exports = route;




