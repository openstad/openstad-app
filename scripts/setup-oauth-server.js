const fs = require('fs').promises;
const util = require('util');
const oauthDb = require('promise-mysql');
const execute = require('./execute');

module.exports = async function setupOauthServer(config) {

  console.log('==============================');
  console.log('Setup oauth server');

  try {
    
    let connection = await oauthDb.createConnection({
      host     : config.OAUTH_DB_HOST,
      user     : config.OAUTH_DB_USERNAME,
      password : config.OAUTH_DB_PASSWORD,
      database : config.OAUTH_DB_NAME,
    })

    // check database
    let doCreateDBTables = false;
    let rows = await connection.query('SHOW TABLES;');
    if (!(rows && rows.length)) {
      doCreateDBTables = true;
    }

    // create local config
    let oauthConfig = `
DB_HOST=${config.OAUTH_DB_HOST}
DB_USER=${config.OAUTH_DB_USERNAME}
DB_PASSWORD=${config.OAUTH_DB_PASSWORD}
DB_NAME=${config.OAUTH_DB_NAME}

MONGO_DB_HOST=${config.OAUTH_MONGO_HOST}
MONGO_DB_PORT=${config.OAUTH_MONGO_PORT}
${config.ADMIN_MONGO_DB_USER && 'MONGO_DB_USER='+config.ADMIN_MONGO_DB_USER || ''}
${config.ADMIN_MONGO_DB_PASSWORD && 'MONGO_DB_PASSWORD='+config.ADMIN_MONGO_DB_PASSWORD || ''}

MAIL_SERVER_URL=${config.OAUTH_MAIL_SERVER_URL}
MAIL_SERVER_PORT=${config.OAUTH_MAIL_SERVER_PORT}
MAIL_SERVER_SECURE=${config.OAUTH_MAIL_SERVER_SECURE}
MAIL_SERVER_PASSWORD=${config.OAUTH_MAIL_SERVER_PASSWORD}
MAIL_SERVER_USER_NAME=${config.OAUTH_MAIL_SERVER_USER_NAME}
FROM_NAME=${config.OAUTH_FROM_NAME}
FROM_EMAIL=${config.OAUTH_FROM_EMAIL}

ADMIN_REDIRECT_URL=${config.OAUTH_ADMIN_REDIRECT_URL}

APP_URL=${config.OAUTH_APP_URL}
PORT=${config.OAUTH_PORT}
EMAIL_ASSETS_URL=${config.OAUTH_EMAIL_ASSETS_URL}

COOKIE_SECURE_OFF=${config.OAUTH_COOKIE_SECURE_OFF}
SESSION_SECRET=${config.OAUTH_SESSION_SECRET}
`
    console.log('------------------------------');
    console.log('Create config file');
    await fs.writeFile('./openstad-oauth-server/.env', oauthConfig);

    // npm i
    console.log('------------------------------');
    console.log('Execute `npm i`');
    await execute('npm', ['i'], { cwd: './openstad-oauth-server' });
 
    // certs
    console.log('------------------------------');
    try {
      await fs.mkdir('openstad-oauth-server/certs')
      console.error('Certs dir created');
    } catch(err) {
      if (err.code !== 'EEXIST') {
        throw err;
        return;
      }
      console.error('Certs dir exists');
    }

    console.log('Create certificates');
    await execute('/usr/bin/openssl', ['genrsa', '-out', 'privatekey.pem', '2048'], { cwd: './openstad-oauth-server/certs/' });
    await execute('/usr/bin/openssl', ['req', '-new', '-key', 'privatekey.pem', '-out', 'certrequest.csr', '-subj', `/C=NL/ST=NA/L=NA/O=OpenStad/OU=OpenStad/CN=openstad.niels${process.env.BASE_DOMAIN}"`], { cwd: './openstad-oauth-server/certs/' });
    await execute('/usr/bin/openssl', ['x509', '-req', '-in', 'certrequest.csr', '-signkey', 'privatekey.pem', '-out', 'certificate.pem'], { cwd: './openstad-oauth-server/certs/' });

    // init db
    if (doCreateDBTables) {

      console.log('------------------------------');
      console.log('Create database tables');
      await execute('../node_modules/knex/bin/cli.js', ['migrate:latest'], { cwd: './openstad-oauth-server', env: { ...process.env } });
      await execute ('../node_modules/knex/bin/cli.js', ['seed:run'], { cwd: './openstad-oauth-server', env: { ...process.env,  AUTH_FIRST_CLIENT_ID: config.OAUTH_FIRST_CLIENT_ID, AUTH_FIRST_CLIENT_SECRET: config.OAUTH_FIRST_CLIENT_SECRET, AUTH_ADMIN_CLIENT_ID: config.OAUTH_ADMIN_CLIENT_ID, AUTH_ADMIN_CLIENT_SECRET: config.OAUTH_ADMIN_CLIENT_SECRET, FRONTEND_URL: config.FRONTEND_APP_URL, ADMIN_URL: config.ADMIN_APP_URL, API_URL: config.API_URL, } } );
      
    } else {

      console.log('------------------------------');
      console.log('Database tables already exist - update records');

      const siteUrl = config.FRONTEND_APP_URL;
      const adminUrl = config.ADMIN_APP_URL;

      let allowedDomains = process.env.NODE_ENV === 'development' ? ['localhost'] : [];
      allowedDomains.push((config.API_URL || '').replace('http://', '').replace('https://', '').replace(/\/$/, ""));
      allowedDomains = JSON.stringify(allowedDomains);

      await connection.query('UPDATE clients SET siteUrl = ?, clientId = ?, clientSecret = ?, allowedDomains = ? WHERE id = 1;', [siteUrl,  config.OAUTH_FIRST_CLIENT_ID, config.OAUTH_FIRST_CLIENT_SECRET, allowedDomains]);
      await connection.query('UPDATE clients SET siteUrl = ?, clientId = ?, clientSecret = ?, allowedDomains = ? WHERE id = 2;', [adminUrl, config.OAUTH_ADMIN_CLIENT_ID, config.OAUTH_ADMIN_CLIENT_SECRET, allowedDomains]);

    }

    
  } catch(err) {
    console.log('------------------------------');
    console.log('Oauth server initialisatie error');
    console.log(err);
    process.exit();
  }

}
