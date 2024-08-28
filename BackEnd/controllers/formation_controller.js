const Joi = require('joi');
const db = require('../models');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Schema validation for adding a formation
const SchemaValidation = Joi.object({
  titre: Joi.string().required(),
  description: Joi.string().required(),
  modeformation: Joi.string().required(),
  besoin: Joi.string().required(),
  domaine: Joi.string().required(),
});

// Add a new formation
const addformation = (titre, description, imgPath, modeformation, besoin, domaine, formateurId) => {
  return new Promise((resolve, reject) => {
    let FormateurPoints;
    let validation = SchemaValidation.validate({ titre, description, modeformation, besoin, domaine });
    if (validation.error) {
      return reject(validation.error.details[0].message);
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
                    pointsf: 20,
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

// Update an existing formation
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
      .catch((err) => reject(err));
  });
};

// Delete a formation
const Deleteformation = (req, res) => {
  const id = req.params.id;

  db.Formation.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({ message: "Formation was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete formation with id=${id}. Maybe formation was not found!` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete formation with id=" + id });
    });
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/image'); // Set upload destination
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set file name
  }
});

// Multer upload configuration for general files
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
}).single('img');

// Validation schema for updating formation image
const SchemaValidationimage = Joi.object({
  img: Joi.string().required(),
});

// Update formation image
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

// Multer configuration for image uploads
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

module.exports = {
  Deleteformation,
  addformation,
  updateformation,
  upload,
  updateimage,
  uploadimg,
};
