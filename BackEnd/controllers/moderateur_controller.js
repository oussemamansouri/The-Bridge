const Joi = require('joi');
const db = require('../models');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Validation schemas
const SchemaValidation = Joi.object({
  firstname: Joi.string().alphanum().min(2).max(15).required(),
  lastname: Joi.string().alphanum().min(2).max(15).required(),
  username: Joi.string().alphanum().min(2).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(),
  imgPath: Joi.string().allow(''),
  tel: Joi.number().integer().required(),
});

const SchemaValidation2 = Joi.object({
  firstname: Joi.string().alphanum().min(2).max(15).required(),
  lastname: Joi.string().alphanum().min(2).max(15).required(),
  username: Joi.string().alphanum().min(2).max(15).required(),
  email: Joi.string().email().required(),
  tel: Joi.number().integer().required(),
});

const SchemaValidationimage = Joi.object({
  img: Joi.string().required(),
});

const SchemaValidationpassword = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(),
  repeatPassword: Joi.ref('newPassword'),
});

// Register a new moderator
const register = async (firstname, lastname, username, email, password, imgPath, tel) => {
  try {
    // Validate input
    const { error } = SchemaValidation.validate({ firstname, lastname, username, email, password, imgPath, tel });
    if (error) throw new Error(error.details[0].message);

    // Check if email is already in use
    const count = await db.Moderateur.count({ where: { email } });
    if (count !== 0) throw new Error('Cet email est déjà utilisé');

    // Hash password and create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return await db.Moderateur.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      img: imgPath,
      tel,
      role: 'moderateur',
    });
  } catch (error) {
    throw error;
  }
};

// Update user profile
const updateprofile = async (firstname, lastname, username, email, tel, id) => {
  try {
    const { error } = SchemaValidation2.validate({ firstname, lastname, username, email, tel });
    if (error) throw new Error(error.details[0].message);

    return await db.Moderateur.update(
      { firstname, lastname, username, email, tel },
      { where: { id } }
    );
  } catch (error) {
    throw error;
  }
};

// Delete user profile
const DeleteProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await db.Moderateur.destroy({ where: { id } });
    if (num === 1) {
      res.send({ message: "Profile was deleted successfully!" });
    } else {
      res.send({ message: `Cannot delete profile with id=${id}. Maybe profile was not found!` });
    }
  } catch (err) {
    res.status(500).send({ message: "Could not delete profile with id=" + id });
  }
};

// Update user image
const updateimage = async (img, id) => {
  try {
    const { error } = SchemaValidationimage.validate({ img });
    if (error) throw new Error('Image URL is invalid');
    
    return await db.Moderateur.update({ img }, { where: { id } });
  } catch (error) {
    throw error;
  }
};

// Update user password
const updatepassword = async (oldPassword, newPassword, repeatPassword, id) => {
  try {
    const { error } = SchemaValidationpassword.validate({ oldPassword, newPassword, repeatPassword });
    if (error) throw new Error(error.details[0].message);
    if (newPassword !== repeatPassword) throw new Error("Le nouveau mot de passe et le mot de passe répété ne correspondent pas");

    const moderateur = await db.Moderateur.findOne({ where: { id } });
    if (!moderateur) throw new Error("Moderateur introuvable");

    const isMatch = await bcrypt.compare(oldPassword, moderateur.password);
    if (!isMatch) throw new Error("L’ancien mot de passe est incorrect");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await db.Moderateur.update({ password: hashedPassword }, { where: { id } });
  } catch (error) {
    throw error;
  }
};

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/image');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit to 1MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf|doc|docx|ppt|pptx/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Format de fichier incorrect');
  }
}).fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }]);

const uploadimg = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Format de fichier incorrect');
  }
}).single('img');

module.exports = {
  DeleteProfile,
  register,
  upload,
  updateprofile,
  updateimage,
  uploadimg,
  updatepassword,
};
