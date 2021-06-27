// importing library
const Hapi = require('@hapi/hapi');

const init = async () => {
  // Create server
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Set routes
  server.route([
    {
      method: 'POST',
      path: '/',
      handler: () => {
        // Put Handler here
      },
    },
  ]);

  await server.start();
  console.log(`Server Running on ${server.info.uri}`);
};

// Running server
init();
