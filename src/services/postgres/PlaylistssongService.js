const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class PlaylistssongService {
  constructor() {
    this._pool = new Pool();
  }

  async addSongToPlaylist(playlistId, songId) {
    const id = `playlistsong-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlistssong VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }
    return result.rows[0];
  }

  async getSongsFromPlaylist(owner) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.year FROM songs 
      LEFT JOIN playlistssong ON playlistssong.song_id = songs.id 
      WHERE playlistssong.playlist_id = $1`,
      values: [owner],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async deleteSongFromPlaylist(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlistssong WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Lagu dalam playlist gagal dihapus');
    }
    return result.rows[0];
  }

  async verifySongPayload(playlistId, songId) {
    const query = {
      text: 'SELECT * FROM playlistssong WHERE playlist_id = $1 AND song_id = $2',
      values: [playlistId, songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Lagu dalam playlist gagal di verifikasi');
    }
  }
}

module.exports = PlaylistssongService;
