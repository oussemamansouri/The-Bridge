const express=require('express')
const route=express.Router()
const db=require('../models')
const demande_controller=require('../controllers/demande_controller')


route.post('/envoyer/:FormateurId/:FormationId/:ReceiverId', async (req, res) => {
    try {
      const response = await demande_controller.envDemande(req.params.FormateurId, req.params.FormationId,req.params.ReceiverId);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

route.delete('/delete/:FormateurId/:FormationId/:ReceiverId',demande_controller.Deletedemande)
 

    route.get('/myDemandes/:FormateurId',(req,res)=>{ 

        db.Demande.findAll({where:{FormateurId:req.params.FormateurId},  include: [
          {
              model: db.Formation,
              include: [
                  {
                      model: db.Formateur,
                      as: 'Formateur'
                  }
              ]
          }
      ]
  }) .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        }) 


        route.get('/RequestsReceive/:ReceiverId',(req,res)=>{ 

          db.Demande.findAll({where:{ReceiverId:req.params.ReceiverId},include:[db.Formation,db.Formateur]})
          .then((response)=>res.status(200).json(response))
          .catch((err)=>res.status(400).json(err))
          
          }) 


module.exports=route