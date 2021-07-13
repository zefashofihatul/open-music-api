const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (
    server,
    { playlistsService, songsService, playlistssongService, validator }
  ) => {
    const playlistsHandler = new PlaylistsHandler(
      playlistsService,
      songsService,
      playlistssongService,
      validator
    );
    server.route(routes(playlistsHandler));
  },
};
