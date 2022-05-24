function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}
document.body.appendChild(component());

const Net = require('net');
const port = 9900;
const host = '192.168.50.122';

function connectToServer(port, host) {
  const client = new Net.Socket();

  client.connect(port, host, () => {
    // no-op
  });

  client.on('data', data => {
    console.log('client-> ' + data);
    client.destroy();
  });

  client.on('close', () => {
    console.log('connection is closed');
  });
}

connectToServer(port, host)
