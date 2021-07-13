/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // Membuat user baru
  pgm.sql(
    "INSERT INTO users(id, username, password, fullname) VALUES ('old_song', 'old_song', 'old_song', 'old_song')"
  );

  // Mengubah nilai owner pada song yang owner-nya nilai NULL
  pgm.sql("UPDATE playlists SET owner = 'old_song' WHERE owner = NULL");

  // Memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
  pgm.addConstraint(
    'playlists',
    'fk_playlists.owner_users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  // Menghapus constraint fk_playlists.owner_users.id pada tabel playlists
  pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');

  // Mengubah nilai owner old_playlists pada song menjadi Null
  pgm.sql("UPDATE playlists SET owner = NULL WHERE owner = 'old_song'");

  // Menghapus user baru
  pgm.sql("DELETE FROM users WHERE id = 'old_song'");
};
