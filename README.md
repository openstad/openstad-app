# Getting started

See Openstad docs for getting started instructions: https://docs.openstad.amsterdam/technical/getting-started.html

## Setup environment (docker)

Running openstad with docker for the first time:

```sh
# Create .env file from .env.example
$ make configure
# Migrate and seed databases (this also builds the images if not already present)
$ make init-databases
# Start services
$ docker-compose up
# Open openstad frontend
$ open http://localhost:4444
```

## WIP: Setup environment (node)

Running openstad via node:

```sh
# Setup environment
$ source setenv
# Install dependencies
$ npm install --no-optional
# Start services
$ npm start
# Setup databases (WARNING: This will reset your existing database)
$ npm run db:install
```
