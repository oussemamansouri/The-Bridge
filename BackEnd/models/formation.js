module.exports=(sequelize,DataType)=>{
    const Formation=sequelize.define("Formation",{
        titre:{
            type:DataType.STRING,
            allowNull:true
        },
        description:{
            type:DataType.STRING,
            allowNull:true
        },
        img:{
            type:DataType.STRING,
            allowNull:true
        },
        pointsf:{
            type:DataType.INTEGER,
            allowNull:true
        },
        modeformation:{
          type:DataType.STRING,
          allowNull:true
        },
        besoin:{
          type:DataType.STRING,
          allowNull:true
        },
        domaine:{
          type:DataType.STRING,
          allowNull:true
        },           
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      })
    Formation.associate = models => {
        Formation.belongsTo(models.Formateur, {
           onDelete: "cascade",
           onUpdate: "cascade"
        })

        Formation.hasOne(models.Participation,{
            onDelete:"cascade",
            onUpdate: 'cascade'
      })
  

    }

return Formation

} 