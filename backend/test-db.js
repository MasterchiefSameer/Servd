const { Client } = require('pg');

const client = new Client({
  host: 'ep-cold-mud-anjsvml1-pooler.c-6.us-east-1.aws.neon.tech',
  port: 5432,
  database: 'neondb',
  user: 'neondb_owner',
  password: 'npg_6d8mpNIkcHht',
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect()
  .then(() => {
    console.log('Connected to the database successfully!');
    client.end();
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
    client.end();
  });
