const InvariantError = require('../../exceptions/InvariantError');

// Import schema validator (Joi Library)
const { CollaborationsPayloadSchema } = require('./schema');

// Validator data
const CollaborationsValidator = {
  validateCollaborationsPayload: (payload) => {
    const validationResult = CollaborationsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

// put your validator code here and export them

module.exports = CollaborationsValidator;
