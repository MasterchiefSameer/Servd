const net = require('net');

console.log('Attempting to connect with net module directly...');
const socket = net.createConnection({
  host: 'ep-cold-mud-anjsvml1-pooler.c-6.us-east-1.aws.neon.tech',
  port: 5432,
  family: 4 // Try IPv4 specifically
}, () => {
  console.log('Successfully connected via IPv4!');
  socket.end();
});

socket.on('error', (err) => {
  console.error('Connection error (IPv4):', err);
});

socket.setTimeout(5000, () => {
  console.error('Socket timed out! (IPv4)');
  socket.destroy();
});
