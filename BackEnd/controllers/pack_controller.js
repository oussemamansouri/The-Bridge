const Joi = require('joi');
const db = require('../models');

const SchemaValidation = Joi.object({
    titre: Joi.string().min(2).max(15).required(),
    description: Joi.string().allow(''),
    description1: Joi.string().allow(''),
    description2: Joi.string().allow(''),
    description3: Joi.string().allow(''),
    prix: Joi.number().integer().required(),
    points: Joi.number().integer().required()
});

const addpack = async (titre, description,description1,description2,description3, prix, points) => {
    try {
        const validation = await SchemaValidation.validateAsync({
            titre,
            description,
            description1,
            description2,
            description3,
            prix,
            points
        });
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }
        const response = await db.Pack.create({
            titre,
            description,
            description1,
            description2,
            description3,
            prix,
            points
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const SchemaValidation2 = Joi.object({
    titre: Joi.string().alphanum().min(2).max(15).required(),
    description: Joi.string().allow(''),
    description1: Joi.string().allow(''),
    description2: Joi.string().allow(''),
    description3: Joi.string().allow(''),
    prix: Joi.number().integer().required(),
    points: Joi.number().integer().required()
});

const updatepack = async (titre, description,description1,description2,description3, prix, points, id) => {
    try {
        const validation = await SchemaValidation2.validateAsync({ titre, description,description1,description2,description3, prix, points });
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        } else {
            const result = await db.Pack.update({
                titre,
                description,
                description1,
                description2,
                description3,
                prix,
                points  
            }, { where: { id: id } });
            return result;
        }
    } catch (error) {
        throw error;
    }
};

const deletepack = async (id) => {
    try {
        const num = await db.Pack.destroy({ where: { id: id } });
        if (num == 1) {
            return { message: "Pack was deleted successfully!" };
        } else {
            throw new Error(`Cannot delete pack with id=${id}. Maybe pack was not found!`);
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addpack,
    updatepack,
    deletepack
};














































// const Joi = require('joi')
// const db=require('../models')
// const bcrypt=require('bcrypt')
// // const jwt=require('jsonwebtoken')
// const multer=require('multer')
// const path=require('path')
// // require('dotenv').config()

// const SchemaValidation = Joi.object({
//     titre: Joi.string().alphanum().min(2).max(15).required(),
//     description: Joi.string().allow(''),
//     prix: Joi.number().integer().required(),
//     points: Joi.number().integer().required()
// });

// const addpack = async (titre, description, prix, points) => {
//   try {
//     const validation = await SchemaValidation.validateAsync({
//         titre,
//         description,
//         prix, 
//         points
//     });
//     if (validation.error) {
//       throw new Error(validation.error.details[0].message);
//     }
//     const response = await db.Pack.create({
//         titre,
//         description,
//         prix, 
//         points
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };


// const SchemaValidation2=Joi.object({
//     titre: Joi.string().alphanum().min(2).max(15).required(),
//     description: Joi.string().allow(''),
//     prix: Joi.number().integer().required(),
//     points: Joi.number().integer().required()

// });

// const updatepack = (titre, description, prix, points,id)=>{
//   return new Promise((resolve,reject)=>{
//       let validation=SchemaValidation2.validate({titre, description, prix, points})
//       if (validation.error){
//           reject(validation.error.details[0].message)
//       }else{
//       db.Pack.update({
//         titre,
//         description,
//         prix,
//         points
//       },{where:{id:id}})
//       .then((response)=>resolve(response))
//       .catch((err)=>reject(err))
//     }
//   })
// }


// const Deletepack = (req, res) => {
//     const id = req.params.id;
  
//     db.Pack.destroy({
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Pack was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete pack with id=${id}. Maybe pack was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete pack with id=" + id
//         });
//       });
//   };




//   module.exports = {
//     addpack,
//     updatepack,
//     Deletepack,
   
   
   
// }