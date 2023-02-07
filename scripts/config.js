// herbruikbare waarden
let BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || 'openstad';
let BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD || 'openstad';

let COOKIE_SECURE_OFF = process.env.FORCE_HTTP ? 'yes' : '';

let API_DOMAIN = process.env.API_DOMAIN || 'openstad-api.' + process.env.BASE_DOMAIN;
let API_URL = process.env.API_URL || 'http://' + API_DOMAIN;
let API_PORT = process.env.API_PORT || '31402';
let API_FIXED_AUTH_KEY = process.env.API_FIXED_AUTH_KEY || generateRandomToken({ length: 2048 });
let API_FIXED_AUTH_TOKENS = process.env.API_FIXED_AUTH_TOKENS || [ {	"token": API_FIXED_AUTH_KEY, "userId": "2" } ];

let OAUTH_DOMAIN = process.env.OAUTH_DOMAIN || 'openstad-oauth.' + process.env.BASE_DOMAIN;
let OAUTH_URL = process.env.OAUTH_URL || 'http://' + OAUTH_DOMAIN;
let OAUTH_PORT = process.env.OAUTH_PORT || '31403';
let OAUTH_JWT_SECRET = generateRandomToken({ length: 64 });
let OAUTH_FIRST_CLIENT_ID = process.env.OAUTH_FIRST_CLIENT_ID || 'default-client';
let OAUTH_FIRST_CLIENT_SECRET = process.env.OAUTH_FIRST_CLIENT_SECRET || generateRandomToken({ length: 64 });
let OAUTH_ADMIN_CLIENT_ID = process.env.OAUTH_ADMIN_CLIENT_ID || 'admin-client';
let OAUTH_ADMIN_CLIENT_SECRET = process.env.OAUTH_ADMIN_CLIENT_SECRET || generateRandomToken({ length: 64 });

let IMAGE_DOMAIN = process.env.IMAGE_DOMAIN || 'openstad-image.' + process.env.BASE_DOMAIN;
let IMAGE_APP_URL = process.env.IMAGE_APP_URL || 'http://' + IMAGE_DOMAIN;
let IMAGE_PORT_API = process.env.IMAGE_PORT_API || 31405;
let IMAGE_PORT_IMAGE_SERVER = process.env.IMAGE_PORT_IMAGE_SERVER || 31406;
let IMAGE_CLIENT_TOKEN = process.env.IMAGE_CLIENT_TOKEN || generateRandomToken({ length: 255 });

let DEFAULT_HOST = 'openstad-cms.' + process.env.BASE_DOMAIN;
let FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || 'openstad-cms.' + process.env.BASE_DOMAIN;
let FRONTEND_APP_URL = process.env.FRONTEND_APP_URL || 'http://' + FRONTEND_DOMAIN;
let FRONTEND_PORT = process.env.FRONTEND_PORT || '31401';
let FRONTEND_PORT2 = process.env.FRONTEND_PORT2 || '31407';

let ADMIN_DOMAIN = process.env.ADMIN_DOMAIN || 'openstad-admin.' + process.env.BASE_DOMAIN;
let ADMIN_APP_URL = process.env.ADMIN_APP_URL || 'http://' + ADMIN_DOMAIN;
let ADMIN_PORT = process.env.ADMIN_PORT || '31404';

// export config
module.exports = {

  // API
  API_DB_HOST: process.env.API_DB_HOST || process.env.DB_HOST,
  API_DB_USERNAME: process.env.API_DB_USERNAME || process.env.DB_USERNAME,
  API_DB_PASSWORD: process.env.API_DB_PASSWORD || process.env.DB_PASSWORD,
  API_DB_NAME: process.env.API_DB_NAME || ( process.env.DB_BASE_NAME ? process.env.DB_BASE_NAME + '-api' :  'openstad-api' ),
  API_DB_DIALECT: process.env.API_DB_DIALECT || process.env.DB_DIALECT || 'mariadb',

  API_URL: API_URL,
  API_DOMAIN: API_DOMAIN,
  API_PORT: API_PORT,

  API_FROM_EMAIL_ADDRESS: process.env.API_FROM_EMAIL_ADDRESS || process.env.FROM_EMAIL_ADDRESS,
  API_SMTP_PORT: process.env.API_SMTP_PORT || process.env.SMTP_PORT,
  API_SMTP_HOST: process.env.API_SMTP_HOST || process.env.SMTP_HOST,
  API_SMTP_USERNAME: process.env.API_SMTP_USERNAME || process.env.SMTP_USERNAME,
  API_SMTP_PASSWORD: process.env.API_SMTP_PASSWORD || process.env.SMTP_PASSWORD,

  API_COOKIE_SECRET: process.env.API_COOKIE_SECRET || generateRandomToken({ length: 32 }),
  API_COOKIE_ONLY_SECURE: process.env.API_COOKIE_ONLY_SECURE || process.env.API_COOKIE_ONLY_SECURE != 'false' ? true : false,

  API_OAUTH_URL: process.env.API_OAUTH_URL || OAUTH_URL,
  API_OAUTH_JWT_SECRET: process.env.API_OAUTH_JWT_SECRET || OAUTH_JWT_SECRET,
  API_OAUTH_DEFAULT_CLIENT_ID: process.env.API_OAUTH_DEFAULT_CLIENT_ID || OAUTH_FIRST_CLIENT_ID,
  API_OAUTH_CLIENT_PASSWORD: process.env.API_OAUTH_CLIENT_PASSWORD || OAUTH_FIRST_CLIENT_SECRET,
  API_FIXED_AUTH_TOKENS: API_FIXED_AUTH_TOKENS,

  // oauth server
  OAUTH_DOMAIN: OAUTH_DOMAIN,
  OAUTH_DB_HOST: process.env.OAUTH_DB_HOST || process.env.DB_HOST,
  OAUTH_DB_USERNAME: process.env.OAUTH_DB_USERNAME || process.env.DB_USERNAME,
  OAUTH_DB_PASSWORD: process.env.OAUTH_DB_PASSWORD || process.env.DB_PASSWORD,
  OAUTH_DB_NAME: process.env.OAUTH_DB_NAME || ( process.env.DB_BASE_NAME ? process.env.DB_BASE_NAME + '-oauth-server' :  'openstad-oauth-server' ),

  OAUTH_MONGO_HOST: process.env.OAUTH_MONGO_HOST || process.env.MONGO_HOST || 'localhost',

  OAUTH_APP_URL: process.env.OAUTH_APP_URL || OAUTH_URL,
  OAUTH_PORT: OAUTH_PORT,

  OAUTH_ADMIN_REDIRECT_URL: process.env.OAUTH_ADMIN_REDIRECT_URL || '/admin/clients',
  OAUTH_ADMIN_CLIENT_ID: process.env.OAUTH_ADMIN_CLIENT_ID || 2,

  OAUTH_EMAIL_ASSETS_URL: process.env.OAUTH_APP_URL || OAUTH_URL,

  OAUTH_MAIL_SERVER_URL: process.env.OAUTH_MAIL_SERVER_URL || process.env.SMTP_HOST,
  OAUTH_MAIL_SERVER_PORT: process.env.OAUTH_MAIL_SERVER_PORT || process.env.SMTP_PORT,
  OAUTH_MAIL_SERVER_SECURE: true,
  OAUTH_MAIL_SERVER_PASSWORD: process.env.OAUTH_MAIL_SERVER_PASSWORD || process.env.SMTP_PASSWORD,
  OAUTH_MAIL_SERVER_USER_NAME: process.env.OAUTH_MAIL_SERVER_USER_NAME || process.env.SMTP_USERNAME,
  OAUTH_FROM_NAME: process.env.OAUTH_FROM_NAME || '',
  OAUTH_FROM_EMAIL: process.env.OAUTH_FROM_EMAIL || process.env.FROM_EMAIL_ADDRESS,

  OAUTH_SESSION_SECRET: process.env.OAUTH_SESSION_SECRET || generateRandomToken({ length: 32 }),
  // TODO: dev vs prod
  OAUTH_COOKIE_SECURE_OFF: typeof process.env.OAUTH_COOKIE_SECURE_OFF != 'undefined' ? process.env.OAUTH_COOKIE_SECURE_OFF : COOKIE_SECURE_OFF,

  OAUTH_LOGIN_CSM_BASIC_AUTH_USER: process.env.OAUTH_LOGIN_CSM_BASIC_AUTH_USER || BASIC_AUTH_USER,
  OAUTH_LOGIN_CSM_BASIC_AUTH_PASSWORD: process.env.OAUTH_LOGIN_CSM_BASIC_AUTH_PASSWORD || BASIC_AUTH_PASSWORD,

  OAUTH_FIRST_CLIENT_ID: OAUTH_FIRST_CLIENT_ID,
  OAUTH_FIRST_CLIENT_SECRET: OAUTH_FIRST_CLIENT_SECRET,
  OAUTH_ADMIN_CLIENT_ID: OAUTH_ADMIN_CLIENT_ID,
  OAUTH_ADMIN_CLIENT_SECRET: OAUTH_ADMIN_CLIENT_SECRET,
  
  // KPN_CLIENT_ID=
  // KPN_CLIENT_SECRET=

  // image server
  IMAGE_DB_HOST: process.env.IMAGE_DB_HOST || process.env.DB_HOST,
  IMAGE_DB_USERNAME: process.env.IMAGE_DB_USERNAME || process.env.DB_USERNAME,
  IMAGE_DB_PASSWORD: process.env.IMAGE_DB_PASSWORD || process.env.DB_PASSWORD,
  IMAGE_DB_NAME: process.env.IMAGE_DB_NAME || ( process.env.DB_BASE_NAME ? process.env.DB_BASE_NAME + '-image-server' :  'openstad-image-server' ),

  IMAGE_DOMAIN: IMAGE_DOMAIN,
  IMAGE_APP_URL: IMAGE_APP_URL,

	IMAGE_PORT_API: IMAGE_PORT_API,
	IMAGE_PORT_IMAGE_SERVER: IMAGE_PORT_IMAGE_SERVER,

	IMAGE_IMAGES_DIR: process.env.IMAGE_IMAGES_DIR || '',
	IMAGE_THROTTLE: process.env.IMAGE_THROTTLE || true,
  IMAGE_THROTTLE_CC_PROCESSORS: process.env.IMAGE_THROTTLE_CC_PROCESSORS || 4,
  IMAGE_THROTTLE_CC_PREFETCHER: process.env.IMAGE_THROTTLE_CC_PREFETCHER || 20,
  IMAGE_THROTTLE_CC_REQUESTS: process.env.IMAGE_THROTTLE_CC_REQUESTS || 100,

  IMAGE_CLIENT_NAME: process.env.IMAGE_CLIENT_NAME || 'default-client',
  IMAGE_CLIENT_TOKEN: IMAGE_CLIENT_TOKEN,
  IMAGE_CLIENT_DISPLAY_NAME: process.env.IMAGE_CLIENT_DISPLAY_NAME || 'Default image server client',

  // frontend
  FRONTEND_LOGIN_CSM_BASIC_AUTH_USER: process.env.FRONTEND_LOGIN_CSM_BASIC_AUTH_USER || BASIC_AUTH_USER,
  FRONTEND_LOGIN_CSM_BASIC_AUTH_PASSWORD: process.env.FRONTEND_LOGIN_CSM_BASIC_AUTH_PASSWORD || BASIC_AUTH_PASSWORD,
  FRONTEND_SAMPLE_DB: process.env.FRONTEND_SAMPLE_DB || 'sampledb',
  FRONTEND_DB_HOST: process.env.FRONTEND_DB_HOST || process.env.MONGO_HOST || 'localhost',
  FRONTEND_DB_PORT: process.env.FRONTEND_DB_PORT || process.env.MONGO_PORT || 27017,
  //FRONTEND_DB_NAME: process.env.FRONTEND_DB_NAME || 'cms-default',
  //FRONTEND_DB_USER: process.env.FRONTEND_DB_USER || 'cms',
  //FRONTEND_DB_PASSWORD: process.env.FRONTEND_DB_PASSWORD || 'okVfJfl0kPSOf0kjQcRS',
  FRONTEND_PORT: FRONTEND_PORT,
  FRONTEND_PORT2: FRONTEND_PORT2,
  FRONTEND_NODE_ENV: process.env.FRONTEND_NODE_ENV || 'development',
  FRONTEND_DEFAULT_HOST: process.env.FRONTEND_DEFAULT_HOST || DEFAULT_HOST,
  FRONTEND_GOOGLE_MAPS_API_KEY: process.env.FRONTEND_GOOGLE_MAPS_API_KEY || undefined,
  FRONTEND_DEFAULT_DB: process.env.FRONTEND_DEFAULT_DB || 'localhost',
  FRONTEND_DOMAIN: FRONTEND_DOMAIN,
  FRONTEND_APP_URL: FRONTEND_APP_URL,
  FRONTEND_API: process.env.FRONTEND_API || API_URL,
  FRONTEND_API_LOGOUT_URL: process.env.FRONTEND_API_LOGOUT_URL || OAUTH_URL + '/logout?clientId=' + OAUTH_FIRST_CLIENT_ID,
  FRONTEND_IMAGE_API_URL: process.env.FRONTEND_IMAGE_API_URL || IMAGE_APP_URL,
  FRONTEND_IMAGE_API_ACCESS_TOKEN: process.env.FRONTEND_IMAGE_API_ACCESS_TOKEN || IMAGE_CLIENT_TOKEN,
  FRONTEND_SESSION_SECRET: process.env.FRONTEND_SESSION_SECRET || generateRandomToken({ length: 32 }),
  FRONTEND_MINIFY_JS: process.env.FRONTEND_MINIFY_JS || 'OFF',
  FRONTEND_APOS_WORKFLOW: process.env.FRONTEND_APOS_WORKFLOW || 'ON',
  FRONTEND_SITE_API_KEY: process.env.FRONTEND_SITE_API_KEY || API_FIXED_AUTH_KEY,
  FRONTEND_INTERNAL_API_URL: process.env.FRONTEND_INTERNAL_API_URL || "http://localhost:" + API_PORT,
  FRONTEND_MAP_TYPE: process.env.FRONTEND_MAP_TYPE || 'googlemaps',
  FRONTEND_MAP_TYPE: process.env.FRONTEND_MAP_TYPE || 'googlemaps',
  FRONTEND_COOKIE_SECURE_OFF: typeof process.env.ADMIN_COOKIE_SECURE_OFF != 'undefined' ? process.env.ADMIN_COOKIE_SECURE_OFF : COOKIE_SECURE_OFF,

  

  // admin
  ADMIN_DOMAIN: ADMIN_DOMAIN,
  ADMIN_APP_URL: ADMIN_APP_URL,
  ADMIN_PORT: ADMIN_PORT,
  ADMIN_PRODUCTION_SERVER_IP: process.env.ADMIN_PRODUCTION_SERVER_IP || process.env.SERVER_IP,
  ADMIN_WILDCARD_HOST: process.env.ADMIN_WILDCARD_HOST || DEFAULT_HOST,
  ADMIN_API_URL: process.env.ADMIN_API_URL || API_URL,
  ADMIN_USER_API: process.env.ADMIN_USER_API || OAUTH_URL,
  ADMIN_USER_API_CLIENT_ID: process.env.ADMIN_USER_API_CLIENT_ID || OAUTH_ADMIN_CLIENT_ID,
  ADMIN_USER_API_CLIENT_SECRET: process.env.ADMIN_USER_API_CLIENT_SECRET || OAUTH_ADMIN_CLIENT_SECRET,
  // TODO: dev vs prod
  ADMIN_COOKIE_SECURE_OFF: typeof process.env.ADMIN_COOKIE_SECURE_OFF != 'undefined' ? process.env.ADMIN_COOKIE_SECURE_OFF : COOKIE_SECURE_OFF,
  ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET || generateRandomToken({ length: 32 }),
  ADMIN_SITE_ID: process.env.ADMIN_SITE_ID || 1,
  ADMIN_SITE_API_KEY: process.env.ADMIN_SITE_API_KEY || API_FIXED_AUTH_KEY,
  ADMIN_BASIC_AUTH_USER: process.env.ADMIN_BASIC_AUTH_USER || BASIC_AUTH_USER,
  ADMIN_BASIC_AUTH_PASSWORD: process.env.ADMIN_BASIC_AUTH_PASSWORD || BASIC_AUTH_PASSWORD,
  ADMIN_EXTERNAL_SITE_REPO: process.env.ADMIN_EXTERNAL_SITE_REPO || API_URL + '/api/template/site',
  ADMIN_MONGO_HOST: process.env.ADMIN_MONGO_HOST || process.env.MONGO_HOST || 'localhost',
  ADMIN_MONGO_PORT: process.env.ADMIN_MONGO_PORT || process.env.MONGO_PORT || 27017,
  ADMIN_FRONTEND_URL: FRONTEND_APP_URL,
  ADMIN_PUBLIC_IP: process.env.ADMIN_PUBLIC_IP || process.env.SERVER_IP,
  ADMIN_IMAGE_API_URL: process.env.ADMIN_IMAGE_API_URL || IMAGE_APP_URL,
  ADMIN_IMAGE_API_ACCESS_TOKEN: process.env.ADMIN_IMAGE_API_ACCESS_TOKEN || IMAGE_CLIENT_TOKEN,
  ADMIN_FORCE_HTTP: process.env.FORCE_HTTP ? 'true' : '',

}

function generateRandomToken(params) {

  var token = '';

  params.chars = params.chars || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  params.length = params.length || 25;

  for (let i = 0; i < params.length; i++) {
    const rnd = Math.floor(params.chars.length * Math.random());
    const chr = params.chars.substring(rnd, rnd + 1);
    token = token + chr;
  }

  return token;

}

