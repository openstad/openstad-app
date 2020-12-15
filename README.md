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

Running openstad via node

```sh
# Install and use node v10
$ nvm install 10 && nvm use 10
# Install dependencies
$ npm install --no-optional
# Start services
$ npm start
```
