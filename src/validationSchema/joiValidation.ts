
import Joi from "joi";

const authorSchema = Joi.object({
    name: Joi.string().required(),
    bio: Joi.string().optional(),
    dob: Joi.date().iso().required()
});


const bookSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    pulishedDate: Joi.date().iso().required(),
    authorId: Joi.number().required()
});



export {authorSchema, bookSchema}