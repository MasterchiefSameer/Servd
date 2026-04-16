const path = require('path');
const { execSync } = require('child_process');

// BULLETPROOF NEON DNS FIX for Windows Node 20+
// The native `node:net` C++ bindings ignore JS `dns` patches and stall when Neon returns dead internal IPs.
// We synchronously resolve a fresh public IPv4 address and force the connection over IP, retaining the domain for SNI.
function getNeonPublicIpSync(hostname) {
  if (typeof hostname !== 'string' || !hostname.includes('neon.tech')) return hostname;
  try {
    const raw = execSync(`node -e "require('dns').promises.lookup('${hostname}', { all: true, family: 4 }).then(res => { const valid = res.filter(r => !r.address.startsWith('100.')); console.log(valid.length ? valid[0].address : res[0].address); }).catch(() => console.log(''))"`, { encoding: 'utf8' });
    const ip = raw.trim();
    if (ip) return ip;
  } catch (err) {}
  return hostname;
}

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');
  
  const originalHost = env('DATABASE_HOST', 'localhost');
  const resolvedHost = getNeonPublicIpSync(originalHost);


  const connections = {
    mysql: {
      connection: {
        host: resolvedHost,
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          servername: originalHost,
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: resolvedHost,
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          servername: originalHost,
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
