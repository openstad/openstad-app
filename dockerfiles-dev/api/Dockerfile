FROM node:12.16.2-alpine3.10

# Packages for node-gyp
RUN apk add --no-cache python build-base

# Project dir
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Add node packages
COPY ./src/package*.json ./
RUN npm ci --only=production
COPY --chown=node:node . .

# Remove build packages
RUN apk del python build-base && rm -rf /var/cache/apk/*

EXPOSE 8101

CMD [ "npm", "start" ]
