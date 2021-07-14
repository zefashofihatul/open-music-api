const ClientError = require('../../exceptions/ClientError');

class PlaylistsHandler {
  constructor(playlistsService, songsService, playlistssongService, validator) {
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._playlistssongService = playlistssongService;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
    this.postSongToPlaylist = this.postSongToPlaylist.bind(this);
    this.getSongsFromPlaylist = this.getSongsFromPlaylist.bind(this);
    this.deleteSongFromPlaylist = this.deleteSongFromPlaylist.bind(this);
  }

  // put your routes handler here

  // Handler routes '/playlists' POST
  async postPlaylistHandler(request, h) {
    try {
      this._validator.validatePlaylistPayload(request.payload);
      const { name } = request.payload;
      const { id: credentialId } = request.auth.credentials;
      const playlistId = await this._playlistsService.addPlaylist({
        credentialId,
        name,
      });
      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId: playlistId.id,
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

  // Handler routes '/playlists' GET
  async getPlaylistsHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const playlists = await this._playlistsService.getPlaylists(credentialId);
      const response = h.response({
        status: 'success',
        data: {
          playlists: playlists,
        },
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

  // Handler routes '/playlists/{playlistId}' DELETE
  async deletePlaylistByIdHandler(request, h) {
    try {
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistOwner(
        playlistId,
        credentialId
      );
      await this._playlistsService.deletePlaylists(playlistId);
      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil dihapus',
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

  // Handler routes '/playlist/{playlistId}/songs' POST
  async postSongToPlaylist(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { playlistId } = request.params;
      const { songId } = request.payload;

      await this._validator.validateSongPlaylistPayload(request.payload);
      await this._playlistsService.verifyPlaylistAccess(
        playlistId,
        credentialId
      );
      await this._songsService.verifySongId(songId);
      await this._playlistssongService.addSongToPlaylist(playlistId, songId);
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
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

  // Handler routes '/playlists/songs' GET
  async getSongsFromPlaylist(request, h) {
    try {
      const { playlistId } = request.params;
      console.log(playlistId);
      const { id: credentialId } = request.auth.credentials;
      await this._playlistsService.verifyPlaylistAccess(
        playlistId,
        credentialId
      );
      const data = await this._playlistssongService.getSongsFromPlaylist(
        playlistId
      );
      const response = h.response({
        status: 'success',
        data: {
          songs: data,
        },
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

  // Handler routes '/playlists/songs' DELETE
  async deleteSongFromPlaylist(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { songId } = request.payload;
      const { playlistId } = request.params;
      await this._songsService.verifySongId(songId);
      await this._playlistsService.verifyPlaylistAccess(
        playlistId,
        credentialId
      );
      await this._playlistssongService.deleteSongFromPlaylist(
        playlistId,
        songId
      );
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
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

module.exports = PlaylistsHandler;
