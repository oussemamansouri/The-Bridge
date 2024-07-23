const Joi = require('joi')
const db=require('../models')
const bcrypt=require('bcrypt')
// const jwt=require('jsonwebtoken')
const multer=require('multer')
const path=require('path')
// require('dotenv').config()


const SchemaValidation = Joi.object({
  username: Joi.string().alphanum().min(2).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(),
  tel: Joi.number().integer().required(),
});

// register admin by Postman **this is temporary** the admin account well be created automatically**

const register = async (username, email, password, imgPath, tel) => {
  try {
    const validation = SchemaValidation.validate({
        username,
        email,
        password,
        tel,
    });
    if (validation.error) {
      throw new Error(validation.error.details[0].message);
    }
    const count = await db.Admin.count({ where: { email } });
    if (count !== 0) {
      throw new Error('Ce email est déjà utilisé');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await db.Admin.create({
      username,
      email,
      password: hashedPassword,
      img: imgPath,
      tel,
      role: 'admin',
    });
    return response;
  } catch (error) {
    throw error;
  }
};









// update admin profile 

const SchemaValidation2=Joi.object({
  username: Joi.string().alphanum().min(2).max(15).required(),
  email: Joi.string().email().required(),
  tel: Joi.number().integer().required(),
})

const updateprofile = (username, email, tel,id)=>{
  return new Promise((resolve,reject)=>{
      let validation=SchemaValidation2.validate({  
        username,
        email,
        tel})
      if (validation.error){
          reject(validation.error.details[0].message)
      }else{
      db.Admin.update({
        username,
        email,
        tel
      },{where:{id:id}})
      .then((response)=>resolve(response))
      .catch((err)=>reject(err))
    }
  })
}



 // update admin image 

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
   
   const response = await db.Admin.update({
     img: img
   }, { where: { id: id } });

   return response;
 } catch (err) {
   throw new Error(err);
 }
}


// update admin password 

const SchemaValidationpassword = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(),
  repeatPassword: Joi.ref('newPassword'),
});


const updatepassword = (oldPassword, newPassword, repeatPassword, id) => {
  return new Promise((resolve, reject) => {
    let validation = SchemaValidationpassword.validate({ oldPassword, newPassword, repeatPassword });
    if (validation.error) {
      reject(validation.error.details[0].message);
    }
    if (!newPassword) {
      reject("Le mot de passe ne peut pas être vide");
    } else if (newPassword !== repeatPassword) {
      reject("Le nouveau mot de passe et le mot de passe répété ne correspondent pas");
    } else {
      db.Admin.findOne({ where: { id: id } })
        .then((admin) => {
          if (!admin) {
            reject("Client introuvable");
          } else {
            bcrypt.compare(oldPassword, admin.password, (err, result) => {
              if (err) {
                reject(err);
              } else if (!result) {
                reject("L’ancien mot de passe est incorrect");
              } else {
                bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                  if (err) {
                    reject(err);
                  } else {
                    db.Admin.update(
                      { password: hashedPassword },
                      { where: { id: id } }
                    )
                      .then((response) => resolve(response))
                      .catch((err) => reject(err));
                  }
                });
              }
            });
          }
        })
        .catch((err) => reject(err));
    }
  });
};



///////////////////////////////////////////////////////////


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
}).fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }])
// .single('img')   ||  .fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }])




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




////////////////////////////////////////////
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
    register,
    upload,
    updateprofile,
    updateimage,
    updatepassword,
    uploadimg

}