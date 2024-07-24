const Joi = require('joi')
const db=require('../models')



const SchemaValidation=Joi.object({
    FormateurId :Joi.number().integer().positive().required(),
    FormationId :Joi.number().integer().positive().required(),
    ReceiverId :Joi.number().integer().positive().required(),

  
})


const accepte=(FormateurId,FormationId,ReceiverId)=>{
    return new Promise((resolve,reject)=>{
        let validation=SchemaValidation.validate({FormateurId,FormationId,ReceiverId})
        if (validation.error){
            reject(validation.error.details[0].message)
        }else{
        db.Participation.count({where:{FormateurId:FormateurId,FormationId:FormationId}}).then(doc=>{
            if (doc!=0){
                reject("Le formateur participe déjà à cette formation")
            }else{

                db.Demande.destroy({where:{ReceiverId:ReceiverId,FormateurId:FormateurId,FormationId:FormationId}})
                db.Participation.create({
                    FormateurId:FormateurId,
                    FormationId:FormationId,
                    ReceiverId:ReceiverId
                }).then((response)=>resolve(response))
                .catch((err)=>reject(err))
                
              
            }
        })}
    })
}

const Deleteparticipation = (req, res) => {
    const clientid = req.params.clientid;
    const formationid = req.params.formationid;

    db.Participation.destroy({
      where: { ClientId: clientid,FormationId: formationid}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "participation was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete participation with clientid=${clientid} and formationid=${formationid}. Maybe participation was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete participation with id=" + id
        });
      });
  }


module.exports = {
    accepte,
    Deleteparticipation
}