import errorHandler from 'errorhandler';
import dotenv from 'dotenv';
import app from './app';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

if (!process.env.BRIDGE_WALLET_PRIVATE_KEY) {
  throw new Error(
    'Environment variable BRIDGE_WALLET_PRIVATE_KEY is required but is either missing or blank.'
  );
}

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

export default server;
