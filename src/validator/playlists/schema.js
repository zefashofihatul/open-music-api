const Joi = require('joi');

// Validation Schema
const PlaylistsPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

// put your schema here and export them

module.exports = { PlaylistsPayloadSchema };
