/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('playlistssong', {
    id: {
      type: 'VARCHAR(50)',
      primary: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  // Menambahkan constraint UNIQUE, kombinasi dari kolom song_id dan playlist_id
  pgm.addConstraint(
    'playlistssong',
    'unique_playlist_id_and_song_id',
    'UNIQUE(playlist_id, song_id)'
  );

  // Memberikan constraint foreign key pada kolom song_id terhadap playlists.id dan songs.id
  pgm.addConstraint(
    'playlistssong',
    'fk_playlistssong.playlist_id_playlists.id',
    'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE'
  );
  pgm.addConstraint(
    'playlistssong',
    'fk_playlistssong.song_id_songs.id',
    'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropTable('playlistssong');
};
