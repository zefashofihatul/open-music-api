const Joi = require('joi');

// Validation Schema
const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(2022).required(),
  performer: Joi.string().required(),
  genre: Joi.string(),
  duration: Joi.number(),
});

// put your schema here and export them

module.exports = { SongPayloadSchema };
