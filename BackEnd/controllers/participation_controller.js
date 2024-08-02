const Joi = require('joi')
const db=require('../models')



const SchemaValidation=Joi.object({
    FormateurId :Joi.number().integer().positive().required(),
    FormationId :Joi.number().integer().positive().required(),
    ReceiverId :Joi.number().integer().positive().required(),
})

const accepte = (FormateurId, FormationId, ReceiverId) => {
    return new Promise((resolve, reject) => {
        let validation = SchemaValidation.validate({ FormateurId, FormationId, ReceiverId });
        if (validation.error) {
            reject(validation.error.details[0].message);
        } else {
            db.Participation.count({ where: { FormateurId: FormateurId, FormationId: FormationId } }).then(doc => {
                if (doc != 0) {
                    reject("Le formateur participe déjà à cette formation");
                } else {
                    db.Demande.destroy({ where: { ReceiverId: ReceiverId, FormateurId: FormateurId, FormationId: FormationId } })
                        .then(() => {
                            return db.Participation.bulkCreate([
                                { FormateurId: FormateurId, FormationId: FormationId, ReceiverId: ReceiverId },
                                { FormateurId: ReceiverId, FormationId: FormationId, ReceiverId: FormateurId }
                            ]);
                        })
                        .then((response) => resolve(response))
                        .catch((err) => reject(err));
                }
            }).catch((err) => reject(err));
        }
    });
};

const Deleteparticipation = (req, res) => {
    const FormateurId = req.params.FormateurId;
    const FormationId = req.params.FormationId;
    const ReceiverId = req.params.ReceiverId;

    db.Participation.destroy({
      where: { FormateurId: FormateurId,FormationId: FormationId,ReceiverId:ReceiverId}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "participation was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete participation with Formateur=${FormateurId} and formationid=${FormationId}. Maybe participation was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete participation with id=" + id
        });
      });
  }
  const getAcceptedFriends = async (FormateurId) => {
    try {
        const participations = await db.Participation.findAll({
            where: { FormateurId: FormateurId },
            include: [
                {
                    model: db.Formateur,
                    as: 'Friend'
                }
            ],
            group: ['ReceiverId']
        });

        const uniqueFriends = participations.map(participation => participation.Friend);

        return uniqueFriends;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    accepte,
    Deleteparticipation,
    getAcceptedFriends
}