module.exports=(sequelize,DataType)=>{
    const Pack=sequelize.define("Pack",{
        titre:{
            type:DataType.STRING,
            allowNull:true
        },
        description:{
            type:DataType.STRING,
            allowNull:true
        },
         description1:{
            type:DataType.STRING,
            allowNull:true
        },
         description2:{
            type:DataType.STRING,
            allowNull:true
        },
         description3:{
            type:DataType.STRING,
            allowNull:true
        },
        prix:{
            type:DataType.FLOAT,
            allowNull:true
        },
        points:{
            type:DataType.INTEGER,
            allowNull:true
        },
       
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      })

return Pack

} 