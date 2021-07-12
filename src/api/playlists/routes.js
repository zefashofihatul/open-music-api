const routes = (handler) => [
  // Put your routes path in here
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}',
    handler: handler.deletePlaylistByIdHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  // {
  //   method: 'POST',
  //   path: '/playlists/{playlistId}/songs',
  //   handler: handler.postSongToPlaylist,
  //   option: {
  //     auth: 'openmusic_jwt',
  //   },
  // },
  // {
  //   method: 'GET',
  //   path: '/playlists/{playlistId}/songs',
  //   handler: handler.getSongsFromPlaylist,
  //   option: {
  //     auth: 'openmusic_jwt',
  //   },
  // },
  // {
  //   method: 'DELETE',
  //   path: '/playlist/{playlistId}/songs',
  //   handler: handler.deleteSongFromPlaylist
  // }
];

module.exports = routes;
