const fs = require('fs');
const util = require('util');
const imgDb = require('promise-mysql');
const execute = require('./execute');

module.exports = async function setupImageServer(config) {

  console.log('==============================');
  console.log('Setup image server');

  try {
    
    let connection = await imgDb.createConnection({
      host     : config.IMAGE_DB_HOST,
      user     : config.IMAGE_DB_USERNAME,
      password : config.IMAGE_DB_PASSWORD,
      database : config.IMAGE_DB_NAME,
    });

    // check database
    let doCreateDBTables = false;
    let rows = await connection.query('SHOW TABLES;')
    if (!(rows && rows.length)) {
      doCreateDBTables = true;
    }

    // create local config
    let imgConfig = `
DB_HOST=${config.IMAGE_DB_HOST}
DB_USER=${config.IMAGE_DB_USERNAME}
DB_PASSWORD=${config.IMAGE_DB_PASSWORD}
DB_NAME=${config.IMAGE_DB_NAME}

APP_URL=${config.IMAGE_APP_URL}
PORT_API=${config.IMAGE_PORT_API}
PORT_IMAGE_SERVER=${config.IMAGE_PORT_IMAGE_SERVER}

IMAGES_DIR=${config.IMAGE_IMAGES_DIR}
THROTTLE=${config.IMAGE_THROTTLE}
THROTTLE_CC_PROCESSORS=${config.IMAGE_THROTTLE_CC_PROCESSORS}
THROTTLE_CC_PREFETCHER=${config.IMAGE_THROTTLE_CC_PREFETCHER}
THROTTLE_CC_REQUESTS=${config.IMAGE_THROTTLE_CC_REQUESTS}
`
    console.log('------------------------------');
    console.log('Create config file');
    await fs.writeFileSync('./openstad-image-server/.env', imgConfig);

    // npm i
    console.log('------------------------------');
    console.log('Execute `npm i`');
    await execute('npm', ['i'], { cwd: './openstad-image-server' });

    // init db
    if (doCreateDBTables) {
      console.log('------------------------------');
      console.log('Create database tables');
      await execute('../node_modules/knex/bin/cli.js', ['migrate:latest'], { cwd: './openstad-image-server' });
    } else {
      console.log('------------------------------');
      console.log('Database tables already exist');
    }

    // create client
    rows = await connection.query('SELECT * FROM clients;')
    if (rows && rows.length) {
      console.log('Now update existing client');
      await connection.query('UPDATE clients SET clientName = ?, token = ?, displayName = ? WHERE id = ?', [config.IMAGE_CLIENT_NAME, config.IMAGE_CLIENT_TOKEN, config.IMAGE_CLIENT_DISPLAY_NAME, 1 ]);
    } else {
      console.log('Create a client');
      await connection.query('INSERT INTO clients VALUES( ?, ?, ?, ?, NOW(), NOW() );', [1, config.IMAGE_CLIENT_NAME, config.IMAGE_CLIENT_TOKEN, config.IMAGE_CLIENT_DISPLAY_NAME])
    }

  } catch(err) {
    console.log('------------------------------');
    console.log('Image server initialisatie error');
    console.log(err);
    process.exit();
  }
}
 
