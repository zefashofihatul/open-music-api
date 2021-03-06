const ClientError = require('../../exceptions/ClientError');

class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postCollaborationsHandler = this.postCollaborationsHandler.bind(this);
    this.deleteCollaborationsHandler =
      this.deleteCollaborationsHandler.bind(this);
  }

  async postCollaborationsHandler(request, h) {
    try {
      this._validator.validateCollaborationsPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { playlistId, userId } = request.payload;
      await this._playlistsService.verifyPlaylistOwner(
        playlistId,
        credentialId
      );
      const collaborationId = await this._collaborationsService.addCollaborator(
        {
          playlistId,
          userId,
        }
      );
      const response = h.response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: {
          collaborationId: collaborationId.id,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        console.log(error);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }

  async deleteCollaborationsHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { playlistId, userId } = request.payload;
      await this._playlistsService.verifyPlaylistOwner(
        playlistId,
        credentialId
      );
      await this._collaborationsService.deleteCollaborator(playlistId, userId);
      const response = h.response({
        status: 'success',
        message: 'Kolaborasi berhasil dihapus',
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        console.log(error);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }
}

module.exports = CollaborationsHandler;
