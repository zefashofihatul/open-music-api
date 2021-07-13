const Joi = require('joi');

// Validation Schema
const PlaylistsPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const SongPlaylistPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

// put your schema here and export them

module.exports = { PlaylistsPayloadSchema, SongPlaylistPayloadSchema };
