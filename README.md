WIP.

###STATUS:
Todo:
- Finish setting all .env values correct for migrations and seeds
- Update Dockerfiles in master branches of all GIT repo
- Mount the frontend so changes are taking into effect

Dockerfiles and docker compose working for DEV machine.

A collection of subrepo's of the main servers of the Openstad application.

When the work is finished will allow with docker to run all servers with one command.

Currently dockerfiles or not in the master branches of the included repo's so will not work out of the box.

Example .env file for production



```
#!/bin/bash

# MYSQL settings, host should be set to mysql not localhost (corresponding to name in compose file)
MYSQL_HOST=mysql
MYSQL_USER=user
MYSQL_PASSWORD=xxxxxxx
MYSQL_ROOT_PASSWORD=xxxxxxx
#this is probably unnecessary
MYSQL_ROOT_DATABASE=dummy
# for dev non https
COOKIE_SECURE_OFF=yes

#general
SESSION_SECRET=xyxyxyxy

#mail
MAIL_TRANSPORT_SMTP_HOST=smtp.gmail.com
MAIL_TRANSPORT_SMTP_HOST=true
MAIL_TRANSPORT_SMTP_AUTH_PASS=opensta
MAIL_TRANSPORT_SMTP_AUTH_USER=admin@openstad.org
MAIL_TRANSPORT_SMTP_PORT=587
MAIL_TRANSPORT_SMTP_REQUIRESSL=true

#api
API_PORT=8111
API_URL=http://localhost:8111
API_HOSTNAME=localhost
API_DATABASE=api
API_EMAILADDRESS=admin@openstad.org
API_MAIL_FROM=`Openstad Dev`
API_NOTIFICATIONS_ADMIN_EMAILADDRESS=admin@openstad.org
API_SECURITY_SESSIONS_COOKIENAME=cookies
API_SECURITY_SESSIONS_ONLYSECURE=false
API_AUTHORIZATION_JWTSECRET=xxxxx
API_AUTHORIZATION_FIXEDAUTHTOKENS=xxxxxxx

#images
IMAGE_DB_NAME=image
IMAGE_APP_URL=http://localhost:3333
IMAGE_API_ACCESS_TOKEN=xxxxxx
IMAGE_PORT_API=3333
IMAGE_PORT_STEAM=7777

#auth
AUTH_DB_NAME=auth
AUTH_PORT=4000
AUTH_APP_URL=http://localhost:4000
AUTH_MAIL_FROM_NAME=`Authenticatie Openstad`
AUTH_MAIL_FROM_MAIL=`auth@openstad.org`

# this wont work for images if it's a localhost of course,
# when practically necessary I normally just take staging url
# would be better to embed images would render this unnecessary
AUTH_EMAIL_ASSETS_URL=http://localhost:4000

#frontend
FRONTED_PORT=4444
#makes a database for the first site
FRONTED_DEFAULT_MONGO_DB=localhost2
FRONTED_APP_URL=http://localhost:4444
#allows to connect to API as admin user
FRONTEND_SITE_API_KEY=xxxxxxx
FRONTEND_APOS_WORKFLOW=ON
#this is for the /login route but not used anymore in new verions
FRONTEND_LOGIN_CSM_BASIC_AUTH_USER=me
FRONTEND_LOGIN_CSM_BASIC_AUTH_PASSWORD=password
#standard it links to local docker api, sometimes it's useful to link to a staging or live url
FRONTEND_API_URL=http://localhost:4444
FRONTEND_MONGO_SCHEME=mongodb://mongo
FRONTEND_MONGO_PORT=27017
FRONTEND_MINIFY_JS=27017
```

## Running migrations and seeds
For now, for dev, the migrations have to be run manually.

There are a few settings in the databases that need to be set correctly for it all
to work together. This works in combination with above .env values.
Any changes in .env values after running the seeds might require database changess.

1. Create the api site entries (runs both basic migrations and seeds.)
```
docker-compose exec api node reset.js
```

2.1 Create the tables for the Auth server
```
docker-compose exec image knex migrate:latest
```

2.2 Seed the table for the Auth server.
```
docker-compose exec image knex seed:run
```

3.1 Create the tables for the Image server
```
docker-compose exec image knex migrate:latest
```

3.2 Seed the tables for the Image server. This seed run will empty the tables, so don't use once running.
```
docker-compose exec image knex seed:run
```

## Mysql
Docker compose creates the databases set in .env file on first run.
If name is changed you will either have to recreate the mysql volume, or manually change or add the database.
Port 3310 is open, so you can access docker database on http://localhost:3310, for instance with sqlpro.
Or log into the docker shell: docker-compose exec mysql sh
