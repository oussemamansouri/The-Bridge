const db=require('../models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')



/////////// login end point /////////

const PrivatKey = "this is private key fdgsfdgsdfgsdfgdsfgdsgfdfgsgdfgdgdfgdsfgsfdgsdfgsdfgdfgdfbds";
exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
      if (!email) {
        reject("email est obligatoire");
      } else if (!password) {
        reject("mot de passe est obligatoire");
      } else {
        let formateur = db.Formateur.findOne({ where: { email: email } });
        let moderateur = db.Moderateur.findOne({ where: { email: email } });
        let admin = db.Admin.findOne({ where: { email: email } });
  
        Promise.all([formateur, moderateur, admin])
          .then(([formateur, moderateur, admin]) => {
            if (!formateur && !moderateur && !admin) {
              reject("e-mail ou mot de passe non valide !");
            } else {
              if (formateur != null) {
                bcrypt.compare(password, formateur.password).then((same) => {
                  if (same) {
                    let token = jwt.sign(
                      {
                        id: formateur.id,
                        name: formateur.firstname,
                        img:formateur.img,
                        role:formateur.role
                      },
                      PrivatKey,
                      { expiresIn: "8h" }
                    );
                    resolve({token:token});
                  } else {
                    reject("e-mail ou mot de passe non valide !");
                  }
                });
              } else {
                if (moderateur != null) {
                  bcrypt.compare(password, moderateur.password).then((same) => {
                    if (same) {
                      let token = jwt.sign(
                        {
                          id: moderateur.id,
                          username: moderateur.username,
                          name: moderateur.name,
                          img:moderateur.img,
                          role:moderateur.role
                        },
                        PrivatKey,
                        { expiresIn: "8h" }
                      );
                      resolve({token});
                    } else {
                      reject("e-mail ou mot de passe non valide !");
                    }
                  });
                } else {
                  if (admin != null) {
                    bcrypt.compare(password, admin.password).then((same) => {
                      if (same) {
                        let token = jwt.sign(
                          {
                            id: admin.id,
                            username: admin.username,
                            img:admin.img,
                            role:'Admin',
                            email:admin.email,
                          },
                          PrivatKey,
                          { expiresIn: "8h" }
                        );
                        resolve({token:token,role:'Admin',username:admin.username});
                      } else {
                        reject("e-mail ou mot de passe non valide !");
                      }
                    });
                  }
                }
              }
            }
          })
          .catch((err) => reject(err));
      }
    });
  };
  



