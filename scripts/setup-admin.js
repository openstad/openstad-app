const fs = require('fs').promises;
const util = require('util');
const execute = require('./execute');

module.exports = async function setupAdmin(config) {

  console.log('==============================');
  console.log('Setup admin');

  try {
    
    let frontendConfig = `APP_URL=${config.ADMIN_APP_URL}
PORT=${config.ADMIN_PORT}
PUBLIC_IP=${config.ADMIN_PUBLIC_IP}
PRODUCTION_SERVER_IP=${config.ADMIN_PRODUCTION_SERVER_IP}

WILDCARD_HOST=${config.ADMIN_WILDCARD_HOST}

SITE_ID=${config.ADMIN_SITE_ID}
SITE_API_KEY=${config.ADMIN_SITE_API_KEY}
API_URL=${config.ADMIN_API_URL}

USER_API=${config.ADMIN_USER_API}
USER_API_CLIENT_ID=${config.ADMIN_USER_API_CLIENT_ID}
USER_API_CLIENT_SECRET=${config.ADMIN_USER_API_CLIENT_SECRET}

MONGO_DB_HOST=${config.ADMIN_MONGO_DB_HOST}
MONGO_DB_PORT=${config.ADMIN_MONGO_DB_PORT}
${config.ADMIN_MONGO_DB_USER && 'MONGO_DB_USER='+config.ADMIN_MONGO_DB_USER || ''}
${config.ADMIN_MONGO_DB_PASSWORD && 'MONGO_DB_PASSWORD='+config.ADMIN_MONGO_DB_PASSWORD || ''}

FRONTEND_URL=${config.ADMIN_FRONTEND_URL}

IMAGE_API_URL=${config.ADMIN_IMAGE_API_URL}
IMAGE_API_ACCESS_TOKEN=${config.ADMIN_IMAGE_API_ACCESS_TOKEN}

EXTERNAL_SITE_REPO=${config.ADMIN_EXTERNAL_SITE_REPO}

BASIC_AUTH_USER=${config.ADMIN_BASIC_AUTH_USER}
BASIC_AUTH_PASSWORD=${config.ADMIN_BASIC_AUTH_PASSWORD}
COOKIE_SECURE_OFF=${config.ADMIN_COOKIE_SECURE_OFF}
SESSION_SECRET=${config.ADMIN_SESSION_SECRET}

FORCE_HTTP=${config.ADMIN_FORCE_HTTP}
`;

    console.log('------------------------------');
    console.log('Create config file');
    await fs.writeFile('./openstad-management-panel/.env', frontendConfig)

    // npm i
    console.log('Execute `npm i`');
    await  execute('npm', ['i'], { cwd: './openstad-management-panel' });
      
  } catch(err) {
    console.log('Admin initialisatie error');
    console.log(err);
    process.exit();
  }


}

