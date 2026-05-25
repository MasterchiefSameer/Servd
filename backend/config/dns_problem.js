// At the top of f:\Web D\Projects\ServedDiet\backend\config\database.js
const dns = require('dns');

// Force IPv4 first to avoid Node.js 20+ IPv6 internalConnectMultiple bug with Neon.tech
dns.setDefaultResultOrder('ipv4first');


// // In backend/config/database.js
// const dns = require('dns');
// dns.setDefaultResultOrder('ipv4first'); // 👈 Add this line

// module.exports = {
//   default: {
//     connection: {
//       client: 'postgres',
//       connection: {
//         host: process.env.DATABASE_HOST,
//         port: process.env.DATABASE_PORT,
//         database: process.env.DATABASE_NAME,
//         username: process.env.DATABASE_USERNAME,
//         password: process.env.DATABASE_PASSWORD,
//       },
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     },
//   },
// };
