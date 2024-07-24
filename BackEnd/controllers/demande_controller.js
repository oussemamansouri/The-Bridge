const Joi = require('joi')
const db=require('../models');
const { where } = require('sequelize');


const SchemaValidation=Joi.object({
    Demander :Joi.number().integer().positive().required(),
    FormationId :Joi.number().integer().positive().required(),
    ReceiverId :Joi.number().integer().positive().required(),
})


const envDemande = async (Demander, FormationId, ReceiverId) => {
  try {
      // Validate input data
      const validation = SchemaValidation.validate({ Demander, FormationId, ReceiverId });
      if (validation.error) {
          throw new Error(validation.error.details[0].message);
      }

      // Ensure Demander and ReceiverId are not the same
      if (Demander === ReceiverId) {
          throw new Error("Demander and ReceiverId cannot be the same.");
      }

      // Check if a similar request already exists
      const demandeCount = await db.Demande.count({ where: { FormateurId: Demander, FormationId: FormationId, ReceiverId: ReceiverId } });
      if (demandeCount !== 0) {
          throw new Error("Le formateur a déjà envoyé une demande pour cette formation!");
      }

      // Find the formateur and check points
      const user = await db.Formateur.findOne({ where: { id: Demander } });
      if (!user) {
          throw new Error("Formateur not found!");
      }

      if (user.points < 20) {
          throw new Error("You don't have enough points!");
      }

      // Create the request
      await db.Demande.create({
          FormateurId: Demander,
          FormationId: FormationId,
          ReceiverId: ReceiverId
      });

      // Update formateur points
      const updatedUser = await db.Formateur.update(
          { points: user.points - 20 },
          { where: { id: Demander } }
      );

      return updatedUser;
  } catch (error) {
      throw error;
  }
};







const Deletedemande = (req, res) => {
    const clientid = req.params.FormateurId;
    const formationid = req.params.FormationId;

    db.Demande.destroy({
      where: { FormateurId: clientid,FormationId: formationid}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "demande was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete demande with clientid=${clientid} and formationid=${formationid}. Maybe demande was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete demande with id=" + id
        });
      });
  }


module.exports = {
    envDemande,
    Deletedemande

    
    

}