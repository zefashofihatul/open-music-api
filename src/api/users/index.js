const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const usersHandler = new UsersHandler(service, validator);
    server.route(routes(usersHandler));

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
