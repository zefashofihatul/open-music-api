const { Pool } = require('pg');
const { nanoid } = require('nanoid');

// Services postgres sql handler
class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  // put your services here
}

module.exports = SongsService;
