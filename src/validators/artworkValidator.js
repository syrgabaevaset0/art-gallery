const Joi = require('joi')

const artworkSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  artist: Joi.string().required(),
  imageUrl: Joi.string().uri().required(),
  price: Joi.number().positive().required()
})

module.exports = {
  artworkSchema
}
