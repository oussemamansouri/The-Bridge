module.exports=(sequelize,DataType)=>{
    const Participation=sequelize.define("Participation",{
      ReceiverId:{
        type:DataType.BIGINT,
        allowNull:true
    } 
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      })

    Participation.associate=models=>{

        Participation.belongsTo(models.Formateur, {
            onDelete: "cascade",
            onUpdate: 'cascade'
         })
         Participation.belongsTo(models.Formation, {
            onDelete: "cascade",
            onUpdate: 'cascade'
         })

    }  

return Participation

} 