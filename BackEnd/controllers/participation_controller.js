const Joi = require('joi');
const db = require('../models');

// Validation schema
const SchemaValidation = Joi.object({
    FormateurId: Joi.number().integer().positive().required(),
    FormationId: Joi.number().integer().positive().required(),
    ReceiverId: Joi.number().integer().positive().required(),
});

// Function to accept participation
const accepte = (FormateurId, FormationId, ReceiverId) => {
    return new Promise((resolve, reject) => {
        const validation = SchemaValidation.validate({ FormateurId, FormationId, ReceiverId });
        if (validation.error) {
            reject(validation.error.details[0].message);
        } else {
            db.Participation.count({ where: { FormateurId, FormationId } })
                .then(doc => {
                    if (doc !== 0) {
                        reject("Le formateur participe déjà à cette formation");
                    } else {
                        return db.Demande.destroy({ where: { ReceiverId, FormateurId, FormationId } });
                    }
                })
                .then(() => {
                    return db.Participation.bulkCreate([
                        { FormateurId, FormationId, ReceiverId },
                        { FormateurId: ReceiverId, FormationId, ReceiverId: FormateurId }
                    ]);
                })
                .then(response => resolve(response))
                .catch(err => reject(err));
        }
    });
};

// Function to delete participation
const Deleteparticipation = (req, res) => {
    const { FormateurId, FormationId, ReceiverId } = req.params;

    db.Participation.destroy({
        where: { FormateurId, FormationId, ReceiverId }
    })
        .then(num => {
            if (num === 1) {
                res.send({ message: "Participation was deleted successfully!" });
            } else {
                res.send({
                    message: `Cannot delete participation with Formateur=${FormateurId} and FormationId=${FormationId}. Maybe participation was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete participation with FormateurId=" + FormateurId + ", FormationId=" + FormationId
            });
        });
};

// Function to get accepted friends
const getAcceptedFriends = async (FormateurId) => {
    try {
        const participations = await db.Participation.findAll({
            where: { FormateurId },
            include: [
                {
                    model: db.Formateur,
                    as: 'Friend'
                }
            ]
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
};
