const Joi = require('joi')
const db=require('../models');
const { where } = require('sequelize');


const SchemaValidation = Joi.object({
  Demander: Joi.number().integer().positive().required(),
  FormationId: Joi.number().integer().positive().required(),
  ReceiverId: Joi.number().integer().positive().required(),
});

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

      // Check if the formation belongs to the Receiver
      const formation = await db.Formation.findOne({ where: { id: FormationId, FormateurId: ReceiverId } });
      if (!formation) {
          throw new Error("The formation does not belong to the receiver.");
      }

       // Check if the formation not all ready participate in the formation
       const participation = await db.Participation.findOne({ where: { FormateurId	: Demander	, FormationId: FormationId,ReceiverId:ReceiverId  } });
       if (participation) {
           throw new Error("The formation is all ready participate in the formation");
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
    const FormateurId = req.params.FormateurId;
    const FormationId = req.params.FormationId;
    const ReceiverId = req.params.ReceiverId;
    

    db.Demande.destroy({
      where: { FormateurId: FormateurId,FormationId: FormationId,ReceiverId:ReceiverId}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "demande was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete demande with clientid=${FormateurId} and formationid=${FormationId}. Maybe demande was not found!`
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