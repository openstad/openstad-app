var { exec } = require('child_process'); // native in nodeJs

// commands list
const commands = [
    {
        name: 'Frontend',
        command: `cd ./frontend && npm i`
    },
    {
        name: 'Api',
        command: 'cd ./api  && npm i'
    },
    {
        name: 'Admin',
        command: 'cd ./admin  && npm i'
    },
    {
        name: 'Image',
        command: 'cd ./image  && npm i --no-optional'
    },
    {
        name: 'Auth',
        command: 'cd ./auth  && npm i'
    },
];


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
