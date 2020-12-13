/**
 * Script to create all mysql tables and fill them with default values
 */

const { exec } = require('child_process'); // native in nodeJs
const { frontendConfig, apiConfig, authConfig, adminConfig, imageConfig }  = require('./config.js');
const { objectToAline } = require('./utils.js');

async function execWaitForOutput(command, execOptions = {}) {
    return new Promise((resolve, reject) => {
        const childProcess = exec(command, execOptions);

        // stream process output to console
        childProcess.stderr.on('data', data => console.error(data));
        childProcess.stdout.on('data', data => console.log(data));
        // handle exit
        childProcess.on('exit', () => resolve());
        childProcess.on('close', () => resolve());
        // handle errors
        childProcess.on('error', error => reject(error));
    })
}

// main calling function
async function  main() {
  //const execut = ;
  console.log('### 1. Create and fill tables API Database')
  await execWaitForOutput(`cd ./api &&  ${objectToAline(apiConfig)} node reset.js`);
  console.log('### 2.1 Create tables Auth Database')
  await execWaitForOutput(`cd ./auth && ${objectToAline(authConfig)}  knex migrate:latest`);
  console.log('### 2.2 Fill tables Auth Database')
  await execWaitForOutput(`cd ./auth &&  ${objectToAline(authConfig)} knex seed:run`);
  console.log('### 3.1 Create tables Image Database')
  await execWaitForOutput(`cd ./image && ${objectToAline(imageConfig)} knex migrate:latest`);
  console.log('### 3.2 Fille tables Image Database')
  await execWaitForOutput(`cd ./image &&  ${objectToAline(imageConfig)} knex seed:run`);
}

// call main
main();
