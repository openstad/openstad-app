const fs = require('fs');

module.exports = async function createNginxConfigExample(config) {

  let nginxConfigExample = `# ----------------------------------------------------------------------------------------------------
# API

server {
  listen 80;
  server_name ${config.API_DOMAIN};
 
  client_max_body_size 20M;

  location / {
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_pass http://localhost:${config.API_PORT};
  }
 
}

# ----------------------------------------------------------------------------------------------------
# oauth

server {
  listen 80;
  server_name ${config.OAUTH_DOMAIN};

  client_max_body_size 20M;

  location / {
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_pass http://localhost:${config.OAUTH_PORT};
  }
 
}

# ----------------------------------------------------------------------------------------------------
# image server

server {
  listen 80;
  server_name ${config.IMAGE_DOMAIN};

  client_max_body_size 20M;

  location / {
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_pass http://localhost:${config.IMAGE_PORT_API};
  }
 
}

# ----------------------------------------------------------------------------------------------------
# frontend

server {
  listen 80;
  server_name ${config.FRONTEND_DOMAIN} *.${config.FRONTEND_DOMAIN};

  client_max_body_size 20M;

  location / {
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_pass http://localhost:${config.FRONTEND_PORT};
  }
 
}

# ----------------------------------------------------------------------------------------------------
# admin

server {
  listen 80;
  server_name ${config.ADMIN_DOMAIN};
 
  client_max_body_size 20M;

  location / {
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_pass http://localhost:${config.ADMIN_PORT};
  }
 
}
`;

  try {
    console.log('==============================');
    console.log('Create nginx config example file');
    await fs.writeFileSync('./nginx.config.example', nginxConfigExample );
  } catch (err) {
    console.log(err);
  }

}
  
