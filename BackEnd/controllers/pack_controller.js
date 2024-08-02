const Joi = require('joi');
const db = require('../models');

const SchemaValidation = Joi.object({
    titre: Joi.string().min(2).max(15).required(),
    description: Joi.string().allow(''),
    description1: Joi.string().allow(''),
    description2: Joi.string().allow(''),
    description3: Joi.string().allow(''),
    prix: Joi.number().integer().required(),
    points: Joi.number().integer().required()
});

const addpack = async (titre, description,description1,description2,description3, prix, points) => {
    try {
        const validation = await SchemaValidation.validateAsync({
            titre,
            description,
            description1,
            description2,
            description3,
            prix,
            points
        });
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }
        const response = await db.Pack.create({
            titre,
            description,
            description1,
            description2,
            description3,
            prix,
            points
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const SchemaValidation2 = Joi.object({
    titre: Joi.string().alphanum().min(2).max(15).required(),
    description: Joi.string().allow(''),
    description1: Joi.string().allow(''),
    description2: Joi.string().allow(''),
    description3: Joi.string().allow(''),
    prix: Joi.number().integer().required(),
    points: Joi.number().integer().required()
});

const updatepack = async (titre, description,description1,description2,description3, prix, points, id) => {
    try {
        const validation = await SchemaValidation2.validateAsync({ titre, description,description1,description2,description3, prix, points });
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        } else {
            const result = await db.Pack.update({
                titre,
                description,
                description1,
                description2,
                description3,
                prix,
                points  
            }, { where: { id: id } });
            return result;
        }
    } catch (error) {
        throw error;
    }
};

const deletepack = async (id) => {
    try {
        const num = await db.Pack.destroy({ where: { id: id } });
        if (num == 1) {
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
