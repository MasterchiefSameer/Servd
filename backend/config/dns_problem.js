// At the top of f:\Web D\Projects\ServedDiet\backend\config\database.js
const dns = require('dns');

// Force IPv4 first to avoid Node.js 20+ IPv6 internalConnectMultiple bug with Neon.tech
dns.setDefaultResultOrder('ipv4first');
