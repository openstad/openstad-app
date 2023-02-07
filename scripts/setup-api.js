const fs = require('fs');
const util = require('util');
const apiDb = require('promise-mysql');
const execute = require('./execute');

module.exports = async function setupApi(config) {

  console.log('==============================');
  console.log('Setup API');

  try {
    
    let connection = await apiDb.createConnection({
      host     : config.API_DB_HOST,
      user     : config.API_DB_USERNAME,
      password : config.API_DB_PASSWORD,
      database : config.API_DB_NAME,
      dialect  : config.API_DB_DIALECT,
    });

    // check database
    let doCreateDBTables = false;
    let rows = await connection.query('SHOW TABLES;')
    if (!(rows && rows.length)) {
      doCreateDBTables = true;
    }

  // create local config
    let apiConfig = {

      "url": config.API_URL,
      "hostname": config.API_DOMAIN,

      "database": {
        host     : config.API_DB_HOST,
        user     : config.API_DB_USERNAME,
        password : config.API_DB_PASSWORD,
        database : config.API_DB_NAME,
        dialect  : config.API_DB_DIALECT,
        "multipleStatements": true
      },

      "express": {
        "port": config.API_PORT,
      },

      "mail": {
        "from": config.API_FROM_EMAIL_ADDRESS,
        "transport": {
          "smtp": {
            "port": config.API_SMTP_PORT,
            "host": config.API_SMTP_HOST,
            "auth": {
              "user": config.API_SMTP_USERNAME,
              "pass": config.API_SMTP_PASSWORD,
            }
          }
        }
      },

      "security": {
        "sessions": {
          "secret": config.API_COOKIE_SECRET,
          "onlySecure": config.API_API_COOKIE_ONLY_SECURE,
        }
      },

      "authorization": {
        "jwt-secret": config.API_OAUTH_JWT_SECRET,
        "auth-server-url": config.API_OAUTH_URL,
        "auth-client-id": config.API_OAUTH_DEFAULT_CLIENT_ID,
        "auth-client-secret": config.API_OAUTH_CLIENT_PASSWORD,
        "auth-server-login-path": "/dialog/authorize?redirect_uri=[[redirectUrl]]&response_type=code&client_id=[[clientId]]&scope=offline",
        "auth-server-exchange-code-path": "/oauth/token",
        "auth-server-get-user-path": "/api/userinfo?client_id=[[clientId]]",
        "auth-server-logout-path": "/logout?clientId=[[clientId]]",
        "after-login-redirect-uri": "/?jwt=[[jwt]]",
        "fixed-auth-tokens": config.API_FIXED_AUTH_TOKENS
      }
    }

    console.log('------------------------------');
    console.log('Create config file');
    await fs.writeFileSync('./openstad-api/config/local.js', 'module.exports = ' + JSON.stringify(apiConfig, null, 2) );

    // npm i
    console.log('------------------------------');
    console.log('Execute `npm i`');
    await execute('npm', ['i'], { cwd: './openstad-api' });

    // init db
    if (doCreateDBTables) {
      console.log('------------------------------');
      console.log('Init API database');
      await execute('node', ['reset.js'], { cwd: './openstad-api' });
    } else {
      console.log('------------------------------');
      console.log('API database already initialized');
    }

    console.log('Now update database records');
    await connection.query('UPDATE sites SET config = JSON_SET(config, "$.allowedDomains", JSON_ARRAY(?, ?)) WHERE id = 1;', [config.API_DOMAIN, config.ADMIN_DOMAIN]);
    await connection.query('UPDATE sites SET config = JSON_SET(config, "$.oauth.default", JSON_OBJECT("auth-client-id", ?, "auth-client-secret", ?)) WHERE id = 1;', [config.OAUTH_ADMIN_CLIENT_ID, config.OAUTH_ADMIN_CLIENT_SECRET]);

  
  } catch(err) {
    console.log('------------------------------');
    console.log('API initialisatie error');
    console.log(err);
    process.exit();
  }

}




