const { spawn } = require('child_process');

module.exports = function execute(command, args, options) {

  return new Promise((resolve, reject) => {

    const child = spawn(command, args, options);

    child.on('error', function(err) {
      console.log('XXX');
      reject(err)
    });

    child.stdout.on('data', (chunk) => {
      console.log(`${chunk}`);
    });

    child.stderr.on('data', (chunk) => {
      console.log(`${chunk}`);
    });

    child.on('close', (code) => {
      resolve();
    });

  });

}
