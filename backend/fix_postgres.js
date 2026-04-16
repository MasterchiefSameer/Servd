const pg = require('pg');
const client = new pg.Pool({
  connectionString: 'postgres://neondb_owner:npg_6d8mpNIkcHht@ep-cold-mud-anjsvml1-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

async function fix() {
  try {
    const res = await client.query(`
      UPDATE public.recipes 
      SET description = '""' 
      WHERE description IS NOT NULL 
        AND description NOT LIKE '"%' 
        AND description NOT LIKE '{%' 
        AND description NOT LIKE '[%'
    `);
    console.log('Fixed rows:', res.rowCount);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

fix();
