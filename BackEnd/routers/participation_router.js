const express=require('express')
const route=express.Router()
const db=require('../models')
const participation_controller=require('../controllers/participation_controller')
const { Where } = require('sequelize/lib/utils')



route.post('/accepte/:FormateurId/:FormationId/:ReceiverId',(req,res)=>{
    participation_controller.accepte(req.params.FormateurId,req.params.FormationId,req.params.ReceiverId)
.then(response=>res.status(200).json(response))
.catch(err=>res.status(400).json(err))
})

route.delete('/deleteparticipation/:FormateurId/:FormationId/:ReceiverId',participation_controller.Deleteparticipation)


route.get('/myParticipation/:FormateurId', async (req, res) => {
    try {
        const participations = await db.Participation.findAll({
            where: { FormateurId: req.params.FormateurId },
            include: [
                {
                    model: db.Formation,
                    include: [
                        {
                            model: db.Formateur,
                            as: 'Formateur'
                        }
                    ]
                },
                // {
                //     model: db.Formateur ,
                
                // }
            ]
        });
        res.status(200).json(participations);
    } catch (err) {
        res.status(400).json(err);
    }
});


route.get('/acceptedFriends/:FormateurId', async (req, res) => {
    try {
        const friends = await participation_controller.getAcceptedFriends(req.params.FormateurId);
        res.status(200).json(friends);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});




module.exports=route