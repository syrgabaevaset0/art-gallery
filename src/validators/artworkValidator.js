const Joi = require('joi');

exports.artworkSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().uri().required(),
  artist: Joi.string().required(),
  year: Joi.number().integer().required(),
  price: Joi.number().required()
});
