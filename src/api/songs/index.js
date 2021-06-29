const SongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songsHandler = new SongsHandler(service, validator);
    server.route(routes(songsHandler));

    /* 
    Route handler constructor
    server.route({
      method: 'POST',
      path: '/songs',
      handler: async () => {
        const notes = await this._service.getNotes();
        return {
          status: 'success',
          data: {
            notes,
          },
        };
      },
    });
    */
  },
};
