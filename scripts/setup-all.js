require('dotenv').config();
const config = require('./config');
const initApi = require('./setup-api');
const initImageServer = require('./setup-image-server');
const initOauthServer = require('./setup-oauth-server');
const initFrontend = require('./setup-frontend');
const initAdmin = require('./setup-admin');
const createNginxConfigExample = require('./create-nginx-config-example');

let modules = [
  initApi,
  initImageServer,
  initOauthServer,
  initFrontend,
  initAdmin,
  createNginxConfigExample,
  function() {
    return new Promise((resolve, reject) => {
      console.log('==============================');
      console.log('Done');
      process.exit();
      resolve();
    })
  }
];

async function init() {

  for (let i = 0; i < modules.length; i++) {
    await modules[i](config);
  }
}

init();

