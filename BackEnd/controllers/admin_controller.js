const Joi = require('joi');
const db = require('../models');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Schema for validating user registration
const SchemaValidation = Joi.object({
  username: Joi.string().alphanum().min(2).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(),
  tel: Joi.number().integer().required(),
});

// Register a new admin
const register = async (username, email, password, imgPath, tel) => {
  try {
    // Validate input data
    const validation = SchemaValidation.validate({ username, email, password, tel });
    if (validation.error) {
      throw new Error(validation.error.details[0].message);
    }

    // Check if email already exists
    const count = await db.Admin.count({ where: { email } });
    if (count !== 0) {
      throw new Error('Ce email est déjà utilisé');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin record
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

// Schema for updating admin profile
const SchemaValidation2 = Joi.object({
  username: Joi.string().alphanum().min(2).max(15).required(),
  email: Joi.string().email().required(),
  tel: Joi.number().integer().required(),
});

// Update admin profile information
const updateprofile = (username, email, tel, id) => {
  return new Promise((resolve, reject) => {
    // Validate input data
    let validation = SchemaValidation2.validate({ username, email, tel });
    if (validation.error) {
      reject(validation.error.details[0].message);
    } else {
      // Update admin profile record
      db.Admin.update({
        username,
        email,
        tel
      }, { where: { id: id } })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    }
  });
};

// Schema for updating admin image
const SchemaValidationimage = Joi.object({
  img: Joi.string().required(),
});

// Update admin profile image
async function updateimage(img, id) {
  try {
    // Validate image URL
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

    // Update admin image record
    const response = await db.Admin.update({
      img: img
    }, { where: { id: id } });

    return response;
  } catch (err) {
    throw new Error(err);
  }
}

// Schema for updating admin password
const SchemaValidationpassword = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(),
  repeatPassword: Joi.ref('newPassword'),
});

// Update admin password
const updatepassword = (oldPassword, newPassword, repeatPassword, id) => {
  return new Promise((resolve, reject) => {
    // Validate password inputs
    let validation = SchemaValidationpassword.validate({ oldPassword, newPassword, repeatPassword });
    if (validation.error) {
      reject(validation.error.details[0].message);
    }
    if (!newPassword) {
      reject("Le mot de passe ne peut pas être vide");
    } else if (newPassword !== repeatPassword) {
      reject("Le nouveau mot de passe et le mot de passe répété ne correspondent pas");
    } else {
      // Find the admin by ID and check old password
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
                // Hash new password and update record
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

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/image'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename with timestamp
  }
});

// Multer upload middleware for handling multiple files
const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' }, // Max file size in bytes
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf|doc|docx|ppt|pptx/;
    const mimeType = fileTypes.test(file.mimetype);  
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true); // Accept file
    }
    cb('Give proper file format to upload'); // Reject file
  }
}).fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }]);

// Multer upload middleware for handling a single image file
const uploadimg = multer({
  storage: storage,
  limits: { fileSize: '1000000' }, // Max file size in bytes
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);  
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true); // Accept file
    }
    cb('Give proper file format to upload'); // Reject file
  }
}).single('img');

module.exports = {
  register,
  upload,
  updateprofile,
  updateimage,
  updatepassword,
  uploadimg
};
