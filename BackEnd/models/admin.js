module.exports = (sequelize, DataType) => {
    // Define the Admin model with its attributes and configurations.
    const Admin = sequelize.define("Admin", {
        username: {
            type: DataType.STRING, // Admin's username as a string.
            allowNull: true // Allows the field to be null.
        },
        password: {
            type: DataType.STRING, // Admin's password as a string.
            allowNull: true // Allows the field to be null.
        },
        img: {
            type: DataType.STRING, // URL or path to the admin's profile image.
            allowNull: true // Allows the field to be null.
        },
        tel: {
            type: DataType.INTEGER, // Admin's telephone number.
            allowNull: true // Allows the field to be null.
        },
        email: {
            type: DataType.STRING, // Admin's email address.
            allowNull: true // Allows the field to be null.
        },
        role: {
            type: DataType.STRING, // Admin's role (e.g., 'admin', 'superadmin').
            allowNull: true // Allows the field to be null.
        }
    }, {
        charset: 'utf8mb4', // Character set to support a wide range of characters including emojis.
        collate: 'utf8mb4_general_ci' // Collation to support case-insensitive comparison of utf8mb4 characters.
    });

    // Return the defined Admin model.
    return Admin;
};
