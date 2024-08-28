const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PrivatKey = "this is private key fdgsfdgsdfgsdfgdsfgdsgfdfgsgdfgdfgdfgdfbds";

// Login endpoint
exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    // Check if email and password are provided
    if (!email) {
      return reject("Email est obligatoire");
    } 
    if (!password) {
      return reject("Mot de passe est obligatoire");
    }

    // Find user in all possible tables (Formateur, Moderateur, Admin)
    const formateurPromise = db.Formateur.findOne({ where: { email: email } });
    const moderateurPromise = db.Moderateur.findOne({ where: { email: email } });
    const adminPromise = db.Admin.findOne({ where: { email: email } });

    Promise.all([formateurPromise, moderateurPromise, adminPromise])
      .then(([formateur, moderateur, admin]) => {
        // Check if any user was found
        if (!formateur && !moderateur && !admin) {
          return reject("Email ou mot de passe non valide !");
        }

        // Helper function to handle password comparison and token generation
        const authenticateUser = (user, role) => {
          bcrypt.compare(password, user.password)
            .then(same => {
              if (same) {
                const token = jwt.sign(
                  {
                    id: user.id,
                    username: user.username || user.firstname, // Default to firstname if username is not available
                    img: user.img,
                    role: role,
                    email: user.email // Include email if available
                  },
                  PrivatKey,
                  { expiresIn: "8h" }
                );
                resolve({ token, role, username: user.username || user.firstname });
              } else {
                reject("Email ou mot de passe non valide !");
              }
            })
            .catch(err => reject(err));
        };

        // Authenticate the found user based on their type
        if (formateur) {
          return authenticateUser(formateur, formateur.role);
        }
        if (moderateur) {
          return authenticateUser(moderateur, moderateur.role);
        }
        if (admin) {
          return authenticateUser(admin, 'Admin');
        }
      })
      .catch(err => reject(err));
  });
};
