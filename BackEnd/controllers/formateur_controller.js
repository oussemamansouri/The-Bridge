const Joi = require('joi');
const db = require('../models');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Validation schema for registration and profile update
const SchemaValidation = Joi.object({
  firstname: Joi.string().alphanum().min(2).max(15).required(),
  lastname: Joi.string().alphanum().min(2).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(),
  imgPath: Joi.string().allow(''),
  tel: Joi.number().integer().required(),
  dob: Joi.date().max('now').required(),
  address: Joi.string().regex(/^[\u0600-\u06FFa-zA-Z\s',-]+$/).required(),
  cvPath: Joi.string().allow(''),
  portfolio: Joi.string().allow(''),
  statu: Joi.string().allow(''),
  linkedin: Joi.string().allow(''),
  niveau: Joi.string().allow(''),
  experience: Joi.string().allow(''),
});

// Register a new formateur
const register = async (firstname, lastname, email, password, imgPath, tel, dob, address, cvPath, portfolio, statu, linkedin, niveau, experience) => {
  try {
    // Validate input data
    const validation = SchemaValidation.validate({
      firstname,
      lastname,
      email,
      password,
      imgPath,
      tel,
      dob,
      address,
      cvPath,
      portfolio,
      statu,
      linkedin,
      niveau,
      experience,
    });
    if (validation.error) {
      throw new Error(validation.error.details[0].message);
    }

    // Check if email already exists
    const count = await db.Formateur.count({ where: { email } });
    if (count !== 0) {
      throw new Error('Ce email est déjà utilisé');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new formateur
    const response = await db.Formateur.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      img: imgPath,
      tel,
      dob,
      address,
      cv: cvPath,
      portfolio,
      statu,
      linkedin,
      niveau,
      experience,
      role: 'formateur',
      points: 300
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Buy points for a formateur
const buyPoints = async (user_id, nbPoints) => {
  try {
    // Check if formateur exists
    const count = await db.Formateur.count({ where: { id: user_id } });
    if (count === 0) {
      throw new Error("Ce formateur n'existe pas");
    }

    // Get current points
    const user = await db.Formateur.findOne({ where: { id: user_id } });
    const existePoints = user.points;

    // Update points
    const updatedUser = await db.Formateur.update(
      { points: existePoints + nbPoints },
      { where: { id: user_id } }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Validation schema for updating profile
const SchemaValidation2 = Joi.object({
  firstname: Joi.string().alphanum().min(2).max(15).required(),
  lastname: Joi.string().alphanum().min(2).max(15).required(),
  dob: Joi.date().less('now').required(),
  address: Joi.string().regex(/^[\u0600-\u06FFa-zA-Z\s',-]+$/).required(),
  tel: Joi.number().integer().required(),
  portfolio: Joi.string().allow(''),
  statu: Joi.string().allow(''),
  linkedin: Joi.string().allow(''),
  niveau: Joi.string().allow(''),
  experience: Joi.string().allow('')
});

// Update formateur profile
const updateprofile = (firstname, lastname, dob, address, tel, portfolio, statu, linkedin, niveau, experience, id) => {
  return new Promise((resolve, reject) => {
    let validation = SchemaValidation2.validate({ firstname, lastname, dob, address, tel, portfolio, statu, linkedin, niveau, experience });
    if (validation.error) {
      reject(validation.error.details[0].message);
    } else {
      db.Formateur.update({
        firstname,
        lastname,
        dob,
        address,
        tel,
        portfolio,
        statu,
        linkedin,
        niveau,
        experience,
      }, { where: { id: id } })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    }
  });
};

// Delete a formateur profile
const DeleteProfile = (req, res) => {
  const id = req.params.id;

  db.Formateur.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Profile was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete profile with id=${id}. Maybe profile was not found!` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete profile with id=" + id });
    });
};

// Validation schema for updating profile image
const SchemaValidationimage = Joi.object({
  img: Joi.string().required(),
});

// Update profile image
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

    const response = await db.Formateur.update({
      img: img
    }, { where: { id: id } });

    return response;
  } catch (err) {
    throw new Error(err);
  }
}

// Validation schema for updating CV
const SchemaValidationcv = Joi.object({
  cv: Joi.string().required(),
});

// Update CV
async function updatecv(cv, id) {
  try {
    const validationResult = SchemaValidationcv.validate({ cv });
    if (validationResult.error) {
      const errorDetails = validationResult.error.details[0];
      let errorMessage = '';

      switch (errorDetails.context.key) {
        case 'cv':
          errorMessage = 'Cv URL is invalid';
          break;
        default:
          errorMessage = errorDetails.message;
      }

      throw new Error(errorMessage);
    }

    const response = await db.Formateur.update({
      cv: cv
    }, { where: { id: id } });

    return response;
  } catch (err) {
    throw new Error(err);
  }
}

// Validation schema for updating password
const SchemaValidationpassword = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(),
  repeatPassword: Joi.ref('newPassword'),
});

// Update password
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
      db.Formateur.findOne({ where: { id: id } })
        .then((formateur) => {
          if (!formateur) {
            reject("Client introuvable");
          } else {
            bcrypt.compare(oldPassword, formateur.password, (err, result) => {
              if (err) {
                reject(err);
              } else if (!result) {
                reject("L’ancien mot de passe est incorrect");
              } else {
                bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                  if (err) {
                    reject(err);
                  } else {
                    db.Formateur.update(
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

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/image'); // Set upload destination
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set file name
  }
});

// Middleware for handling image and CV uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf|doc|docx|ppt|pptx/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper file format to upload');
  }
}).fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }]);

const uploadimg = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper file format to upload');
  }
}).single('img');

const uploadcv = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|doc|docx|rtf|txt|jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper file format to upload');
  }
}).single('cv');

module.exports = {
  DeleteProfile,
  register,
  buyPoints,
  upload,
  updateprofile,
  updateimage,
  uploadimg,
  updatepassword,
  updatecv,
  uploadcv
};
