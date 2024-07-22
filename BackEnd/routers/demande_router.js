const express=require('express')
const route=express.Router()
const db=require('../models')
const demande_controller=require('../controllers/demande_controller')




//////////////////////////////


route.post('/envoyer/:FormateurId/:FormationId/:ReceiverId', async (req, res) => {
    try {
      const response = await demande_controller.envDemande(req.params.FormateurId, req.params.FormationId,req.params.ReceiverId);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

route.delete('/delete/:FormateurId/:FormationId',demande_controller.Deletedemande)
 

    route.get('/myDemandes/:FormateurId',(req,res)=>{ 

        db.Demande.findAll({where:{FormateurId:req.params.FormateurId},include:[db.Formation]})
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        
        }) 


        route.get('/RequestsReceive/:ReceiverId',(req,res)=>{ 

          db.Demande.findAll({where:{ReceiverId:req.params.ReceiverId},include:[db.Formation,db.Formateur]})
          .then((response)=>res.status(200).json(response))
          .catch((err)=>res.status(400).json(err))
          
          }) 

        // route.get('/participationRequests/:FormateurId', async (req, res) => {
        //     try {
        //       const FormateurId = req.params.FormateurId;
          
        //       // Find the formateur
        //       const formateur = await db.Formateur.findByPk(FormateurId);
        //       if (!formateur) {
        //         return res.status(404).json({ error: "Formateur not found" });
        //       }
          
        //       // Find all participation requests for the formateur's formations
        //       const participationRequests = await db.Demande.findAll({
        //         include: [
        //           {
        //             model: db.Formation,
        //             where: { FormateurId: formateur.id }, // Filter by formateur id
        //             include: [
        //               {
        //                 model: db.Formateur, // Include the formateur information for each formation
        //                 attributes: ['id', 'firstname', 'lastname', 'email','img'] // Include only necessary attributes
        //               }
        //             ]
        //           }
        //         ]
        //       });
          
        //       res.status(200).json(participationRequests);
        //     } catch (error) {
        //       console.error(error);
        //       res.status(500).json({ error: "Internal Server Error" });
        //     }
        //   });
          

        // route.get('/participationRequests/:FormateurId', async (req, res) => {
        //   try {
        //     const FormateurId = req.params.FormateurId;
        
        //     // Find the formateur
        //     const formateur = await db.Formateur.findByPk(FormateurId);
        //     if (!formateur) {
        //       return res.status(404).json({ error: "Formateur not found" });
        //     }
        
        //     // Find all participation requests for the formateur's formations
        //     const participationRequests = await db.Demande.findAll({ where:{ReceiverId : FormateurId},
        //       include: [
        //         {
        //           model: db.Formation,
        //         }
        //       ]
        //     });
        
        //     // Extract other formateurs' information
        //     const otherFormateurs = participationRequests.reduce((acc, curr) => {
        //       curr.Formation.Formateurs.forEach((otherFormateur) => {
        //         acc.push(otherFormateur);
        //       });
        //       return acc;
        //     }, []);
        
        //     res.status(200).json(otherFormateurs);
        //   } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ error: "Internal Server Error" });
        //   }
        // });
        
        


   




module.exports=route