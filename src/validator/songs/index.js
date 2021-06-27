const InvariantError = require('../../exceptions/InvariantError');

// Import schema validator (Joi Library)
const { SongPayloadSchema } = require('./schema');

// Validator data
const SongsValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

// put your validator code here and export them

module.exports = SongsValidator;
