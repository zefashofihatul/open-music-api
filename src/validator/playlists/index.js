const InvariantError = require('../../exceptions/InvariantError');

// Import schema validator (Joi Library)
const { PlaylistsPayloadSchema } = require('./schema');

// Validator data
const PlaylistValidator = {
  validatePlaylistPayload: (payload) => {
    const validationResult = PlaylistsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

// put your validator code here and export them

module.exports = PlaylistValidator;
