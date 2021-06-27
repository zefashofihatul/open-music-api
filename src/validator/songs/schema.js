const Joi = require('joi');

// Validation Schema
const SongPayloadSchema = {
  title: Joi.string().required(),
  year: Joi.number().required(),
  performer: Joi.string().required(),
  genre: Joi.string(),
  duration: Joi.number(),
};

// put your schema here and export them

module.exports = { SongPayloadSchema };
