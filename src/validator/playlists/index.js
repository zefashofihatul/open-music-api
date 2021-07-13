const InvariantError = require('../../exceptions/InvariantError');

// Import schema validator (Joi Library)
const {
  PlaylistsPayloadSchema,
  SongPlaylistPayloadSchema,
} = require('./schema');

// Validator data
const PlaylistValidator = {
  validatePlaylistPayload: (payload) => {
    const validationResult = PlaylistsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateSongPlaylistPayload: (payload) => {
    const validationResult = SongPlaylistPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

// put your validator code here and export them

module.exports = PlaylistValidator;
