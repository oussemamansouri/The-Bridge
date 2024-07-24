const Joi = require('joi')
const db=require('../models')
const bcrypt=require('bcrypt')
// const jwt=require('jsonwebtoken')
const multer=require('multer')
const path=require('path')
// require('dotenv').config()


/////////// add formation /////////

const SchemaValidation = Joi.object({
  titre: Joi.string().required(),
  description: Joi.string().required(),
  modeformation: Joi.string().required(),
  besoin: Joi.string().required(),
  domaine: Joi.string().required(),
});

const addformation = (titre, description, imgPath, modeformation, besoin, domaine, formateurId) => {
  return new Promise((resolve, reject) => {
    let FormateurPoints;
    let validation = SchemaValidation.validate({ titre, description, modeformation, besoin, domaine });
    if (validation.error) {
      reject(validation.error.details[0].message);
    } else {
      db.Formateur.findOne({ where: { id: formateurId } })
        .then((response) => {
          if (response) {
            FormateurPoints = response.points;
            if (FormateurPoints >= 20) {
              db.Formateur.update({ points: FormateurPoints - 20 }, { where: { id: formateurId } })
                .then(() => {
                  db.Formation.create({
                    titre,
                    description,
                    img: imgPath,
                    pointsf : 20,
                    modeformation,
                    besoin,
                    domaine,
                    FormateurId: formateurId
                  })
                    .then((response) => resolve(response))
                    .catch((err) => reject(err));
                })
                .catch((err) => reject(err));
            } else {
              reject("Points insuffisants pour le formateur.");
            }
          } else {
            reject("Formateur non trouvé.");
          }
        })
        .catch((err) => reject(err));
    }
  });
};













//////////// update formation //////////
  
const updateformation = (titre, description, pointsf, modeformation, besoin, domaine, id) => {
    return new Promise((resolve, reject) => {
        db.Formation.update({
            titre,
            description,
            pointsf,
            modeformation,
            besoin,
            domaine,
        }, { where: { id } })
            .then((response) => resolve(response))
            .catch((err) => reject(err))
    });
};


  
 //////////// delete formation ///////////
 
const Deleteformation = (req, res) => {
    const id = req.params.id;
  
    db.Formation.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Formation was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete formation with id=${id}. Maybe formation was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete formation with id=" + id
        });
      });
  };
  



  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/image')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|pdf|doc|docx|ppt|pptx/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('img') 
// .single('img')   ||  .fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }])
  
  

/////////// update image ///////////
  
  const SchemaValidationimage=Joi.object({
    img:Joi.string().required(),
  })
  
 
  async function updateimage(img, id) {
   try {
     const validationResult = SchemaValidationimage.validate({ img });
     if (validationResult.error) {
       const errorDetails = validationResult.error.details[0];
       let errorMessage = '';
  
       switch (errorDetails.context.key) {
         case 'img':
           errorMessage = 'Image URL is invalid';
           break;
         default:
           errorMessage = errorDetails.message;
       }
  
       throw new Error(errorMessage);
     }
     
     const response = await db.Formation.update({
       img: img
     }, { where: { id: id } });
  
     return response;
   } catch (err) {
     throw new Error(err);
   }
  }

  const uploadimg = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))
  
        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
  }).single('img')
  // .single('img')   ||  .fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }])
  
  


    
  // const PrivatKey=process.env.PRIVATKEY
  // const login=(email,password)=>{
  // return new Promise((resolve, reject) => {
      
  // db.Client.findOne({where:{email:email}}).then(user=>{
  // if(!user){
  //     reject("invalid email or password !")
  // }else{
  // bcrypt.compare(password,user.password).then(same=>{
  // if(same){
  // let token=jwt.sign({id:user.id,firstname:user.firstname,lastname:user.lastname,role:"client"},PrivatKey,{expiresIn:"8h"})
  // resolve(token)
  // }else{
  
  //     reject("invalid email or password !")
  // }
  
  // })
  
  // }
  
  // })
  
  // })
  // }
  
  
  
    module.exports = {
      Deleteformation,
      addformation,
      updateformation,
      upload,
      updateimage,
      uploadimg,

  }














































































// // const formationSchema = Joi.object({
// //     titre: Joi.string().required(),
// //     discription: Joi.string().required(),
// //     img: Joi.string().optional().allow(''), // Allow empty string for optional image
// //     prix: Joi.number().required(),
// //     heures: Joi.number().required(),
// //     formateurp: Joi.string().required(),
// //     modeformation: Joi.string().required(),
// //     pack: Joi.string().optional().allow(''), // Allow empty string for optional pack
// //     objectif: Joi.string().required(),
// //     besoin: Joi.string().required(),
// //     domaine: Joi.string().required(),
// //     date_debut: Joi.date().required(),
// //     date_fin: Joi.date().required().greaterThan(Joi.ref('date_debut')), // Ensure end date is after start date
// //   });

