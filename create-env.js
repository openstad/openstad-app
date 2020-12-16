#!/usr/bin/env node
/**
 * Script to create seperate .env files for each service in their own directory.
 * This way we can use a large .env file at the root of the project and use that to
 * configure the smaller services without naming conflicts.
 *
 * WARNING: This will override any existing .env files
 */
const {
  adminConfig,
  apiConfig,
  authConfig,
  frontendConfig,
  imageConfig,
} = require("./config.js");
const { createEnvFile } = require("./utils.js");

createEnvFile("admin/.env", adminConfig);
createEnvFile("api/.env", apiConfig);
createEnvFile("auth/.env", authConfig);
createEnvFile("frontend/.env", frontendConfig);
createEnvFile("image/.env", imageConfig);
