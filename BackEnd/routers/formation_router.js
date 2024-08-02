const express=require('express')
const route=express.Router()
const db=require('../models')
const formation_controller=require('../controllers/formation_controller')
// const jwt=require('jsonwebtoken')
// require('dotenv').config()
const path=require('path')
const multer = require('multer');

// Configurer multer pour enregistrer les fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/image'); // Modifier le chemin selon votre configuration
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

route.post('/addformation/:formateurId', upload.single('img'), (req, res) => {
    const defaultImg = 'assets/image/formation.png';
    let imgPath = defaultImg;
  
    // Vérifie si une image a été téléchargée
    if (req.file) {
      imgPath = req.file.path;
    }
  
    formation_controller.addformation(req.body.titre, req.body.description, imgPath, req.body.modeformation, req.body.besoin, req.body.domaine, req.params.formateurId)
      .then(response => res.status(200).json(response))
      .catch(err => res.status(400).json(err));
  });

route.get('/formations/:FormateurId', (req, res) => {
    db.Formation.findAll({
        where: { FormateurId: req.params.FormateurId },
        include: [db.Formateur]
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(400).json(err));
});


    route.patch('/updateformation/:id',(req,res)=>{
        formation_controller.updateformation(req.body.titre,req.body.description,req.body.pointsf,req.body.modeformation,req.body.besoin,req.body.domaine,req.params.id)
    .then(response=>res.status(200).json(response))
    .catch(err=>res.status(400).json(err))
    })

    
    route.patch('/updateimage/:id', formation_controller.uploadimg, (req, res) => {
        formation_controller.updateimage(req.file.path, req.params.id)
          .then(response => res.status(200).json(response))
          .catch(err => res.status(400).json(err))
      })


   
    route.delete('/deleteformation/:id', formation_controller.Deleteformation)


    route.get('/formations',(req,res,next)=>{ 

        db.Formation.findAll({include:[db.Formateur]})
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        })


        route.get('/formation/:id',(req,res)=>{ 

            db.Formation.findOne({where: {id: req.params.id}, include: [db.Formateur]})
            .then((response)=>res.status(200).json(response))
            .catch((err)=>res.status(400).json(err))
            })

 module.exports = route;




