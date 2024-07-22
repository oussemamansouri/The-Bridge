const express=require('express')
const route=express.Router()
const db=require('../models')
const participation_controller=require('../controllers/participation_controller')





//////////////////////////////


route.post('/accepte/:FormateurId/:FormationId/:ReceiverId',(req,res)=>{
    participation_controller.accepte(req.params.FormateurId,req.params.FormationId,req.params.ReceiverId)
.then(response=>res.status(200).json(response))
.catch(err=>res.status(400).json(err))
})

route.delete('/deleteparticipation/:FormateurId/:formationid/:ReceiverId',participation_controller.Deleteparticipation)



// route.get('/participant/:FormationId',(req,res)=>{ 

//     db.Participation.findAndCountAll({where:{FormationId:req.params.FormationId},include:[db.Client]})
//     .then((response)=>res.status(200).json(response))
//     .catch((err)=>res.status(400).json(err))
    
//     }) //findAndCountAll 
 


    route.get('/myParticipation/:FormateurId',(req,res)=>{ 

        db.Participation.findAll({where:{FormateurId:req.params.FormateurId},include:[db.Formation]})
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err))
        
        }) 

        // route.get('/participation/:ClientId', (req, res) => {
        //   db.Participation.findAll({
        //     where: { ClientId: req.params.ClientId },
        //     include: [
        //       {
        //         model: db.Formation,
        //         include: [db.Centre]
        //       }
        //     ]
        //   })
        //     .then((participations) => {
        //       res.status(200).json(participations);
        //     })
        //     .catch((err) => {
        //       res.status(400).json(err);
        //     });
        // });    
////////// avec centre information !!!


// get only formations that belong to one client and one centre
        // route.get('/participation/:ClientId/:CentreId', async (req, res) => {
        //     const { ClientId, CentreId } = req.params;
        //     try {
        //       const formations = await db.Formation.findAll({
        //         where: {
        //           CentreId: CentreId
        //         },
        //         include: [{
        //           model: db.Participation,
        //           where: {
        //             ClientId: ClientId
        //           }
        //         }]
        //       });
          
        //       res.status(200).json(formations);
        //     } catch (err) {
        //       res.status(400).json(err);
        //     }
        //   });
          

   




module.exports=route