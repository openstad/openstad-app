const fs = require('fs').promises;
const util = require('util');
const execute = require('./execute');

module.exports = async function setupFrontend(config) {

  console.log('==============================');
  console.log('Setup frontend');

  try {

    let frontendConfig = `LOGIN_CSM_BASIC_AUTH_USER=${config.FRONTEND_LOGIN_CSM_BASIC_AUTH_USER}
LOGIN_CSM_BASIC_AUTH_PASSWORD=${config.FRONTEND_LOGIN_CSM_BASIC_AUTH_PASSWORD}
SAMPLE_DB=${config.FRONTEND_SAMPLE_DB}
DB_HOST=${config.FRONTEND_DB_HOST}
MONGO_DB_HOST=${config.FRONTEND_MONGO_DB_HOST}
MONGO_DB_PORT=${config.FRONTEND_MONGO_DB_PORT}
${config.ADMIN_MONGO_DB_USER && 'MONGO_DB_USER='+config.ADMIN_MONGO_DB_USER || ''}
${config.ADMIN_MONGO_DB_PASSWORD && 'MONGO_DB_PASSWORD='+config.ADMIN_MONGO_DB_PASSWORD || ''}
PORT=${config.FRONTEND_PORT}
PORT2=${config.FRONTEND_PORT2}
NODE_ENV=${config.FRONTEND_NODE_ENV}
DEFAULT_HOST=${config.FRONTEND_DEFAULT_HOST}
GOOGLE_MAPS_API_KEY=${config.FRONTEND_GOOGLE_MAPS_API_KEY}
DEFAULT_DB=${config.FRONTEND_DEFAULT_DB}
APP_URL=${config.FRONTEND_APP_URL}
API=${config.FRONTEND_API}
API_LOGOUT_URL=${config.FRONTEND_API_LOGOUT_URL}
IMAGE_API_URL=${config.FRONTEND_IMAGE_API_URL}
IMAGE_API_ACCESS_TOKEN=${config.FRONTEND_IMAGE_API_ACCESS_TOKEN}
SESSION_SECRET=${config.FRONTEND_SESSION_SECRET}
MINIFY_JS=${config.FRONTEND_MINIFY_JS}
APOS_WORKFLOW=${config.FRONTEND_APOS_WORKFLOW}
SITE_API_KEY=${config.FRONTEND_SITE_API_KEY}
INTERNAL_API_URL=${config.FRONTEND_INTERNAL_API_URL}
MAP_TYPE=${config.FRONTEND_MAP_TYPE}
COOKIE_SECURE_OFF=${config.FRONTEND_COOKIE_SECURE_OFF}
`;

    console.log('------------------------------');
    console.log('Create config file');
    await fs.writeFile('./openstad-frontend/.env', frontendConfig)

    // npm i
    console.log('Execute `npm i`');
    await execute('npm', ['i'], { cwd: './openstad-frontend' });

  } catch(err) {
    console.log('Frontend initialisatie error');
    console.log(err);
    process.exit();
  }

}
                       
