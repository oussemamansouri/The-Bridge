const Joi = require('joi');
const db = require('../models');

// Validation schema
const SchemaValidation = Joi.object({
    titre: Joi.string().min(2).max(15).required(),
    description: Joi.string().allow(''),
    description1: Joi.string().allow(''),
    description2: Joi.string().allow(''),
    description3: Joi.string().allow(''),
    prix: Joi.number().integer().required(),
    points: Joi.number().integer().required()
});

// Add a new pack
const addpack = async (titre, description, description1, description2, description3, prix, points) => {
    try {
        await SchemaValidation.validateAsync({ titre, description, description1, description2, description3, prix, points });
        
        return await db.Pack.create({
            titre,
            description,
            description1,
            description2,
            description3,
            prix,
            points
        });
    } catch (error) {
        throw error;
    }
};

// Update an existing pack
const updatepack = async (titre, description, description1, description2, description3, prix, points, id) => {
    try {
        await SchemaValidation.validateAsync({ titre, description, description1, description2, description3, prix, points });
        
        return await db.Pack.update({
            titre,
            description,
            description1,
            description2,
            description3,
            prix,
            points  
        }, { where: { id } });
    } catch (error) {
        throw error;
    }
};

// Delete a pack
const deletepack = async (id) => {
    try {
        const num = await db.Pack.destroy({ where: { id } });
        if (num === 1) {
            return { message: "Pack was deleted successfully!" };
        } else {
            throw new Error(`Cannot delete pack with id=${id}. Maybe pack was not found!`);
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addpack,
    updatepack,
    deletepack
};
