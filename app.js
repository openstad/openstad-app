var { exec } = require('child_process'); // native in nodeJs
const {frontendConfig, apiConfig, authConfig, adminConfig, imageConfig}  = require('./config.js');


const objectToAline = (obj) => {
  return Object.keys(obj).map(function (key) {
    return "" + key + "='" + obj[key] +"'"; // line break for wrapping only
  }).join(" ");
}

console.log('objectToAline', objectToAline(frontendConfig))


// commands list
const commands = [
    {
        name: 'Frontend',
        command: `cd ./frontend && ${objectToAline(frontendConfig)} npm run dev`
    },
    {
        name: 'Api',
        command: `cd ./api && ${objectToAline(apiConfig)} npm run dev`
    },
    {
        name: 'Admin',
        command: `cd ./admin && ${objectToAline(adminConfig)} npm run dev`
    },
    {
        name: 'Image',
        command: `cd ./image && ${objectToAline(imageConfig)} node server.js`
    },
    {
        name: 'Auth',
        command: `cd ./auth && ${objectToAline(authConfig)} npm run dev`
    },
];


// run command
function runCommand(command, name, callback) {
    console.log('command 1', command);

    child_process.exec(command, function (error, stdout, stderr) {
        console.log('command2 ', command, error);
        if (stderr) {
            callback(stderr, null);
        } else {
            callback(null, `Successfully executed ${name} ...`);
        }
    });
}

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
async function   main() {
    commands.forEach(async (element) => {
        await execWaitForOutput(element.command);

        /*
        console.log('element', element)
        runCommand(element.command, element.name, (err, res) => {
            if (err) {
                console.error(err);
            } else {
                console.log('running:', res);
            }
        });
        */
    });
}

// call main
main();
