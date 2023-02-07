const execute = require('./execute');

async function start() {

  console.log('==============================');

  let command = 'node';
  
  try {
    console.log('Test for nodemon');
    await execute('nodemon', ['--version'], { cwd: '.' });
    command = 'nodemon'
  } catch (err) {
    console.log('nodemon not found');
  }

  
  try {
    
    console.log('Start oauth-server');
    execute(command, ['app.js'], { cwd: './openstad-oauth-server' });

    console.log('Start image-server');
    execute(command, ['server.js'], { cwd: './openstad-image-server' });

    console.log('Start frontend');
    execute(command, ['index.js'], { cwd: './openstad-frontend' });

    console.log('Start admin');
    execute(command, ['app.js'], { cwd: './openstad-management-panel' });

    console.log('Start API');
    execute(command, ['server.js'], { cwd: './openstad-api' });

  } catch (err) {
    console.log('ERROR');
    console.log(err);
    process.exit();
  }

}

start();

