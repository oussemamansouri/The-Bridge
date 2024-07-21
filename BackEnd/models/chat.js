module.exports = (sequelize, DataTypes) => {
    const ChatMessage = sequelize.define("ChatMessage", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  
    ChatMessage.associate = (models) => {
      // Association avec le formateur expéditeur
      ChatMessage.belongsTo(models.Formateur, {
        foreignKey: 'sender_id',
        as: 'sender',
        allowNull: false
      });
      
      // Association avec le formateur destinataire (facultatif)
      ChatMessage.belongsTo(models.Formateur, {
        foreignKey: 'recipient_id',
        as: 'recipient'
      });
    };
  
    return ChatMessage;
  };
  