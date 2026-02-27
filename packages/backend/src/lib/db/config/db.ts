import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

export const pool = new Pool({
  connectionString: `postgresql://postgres:admin@localhost:5432/test?client_encoding=utf8`,
   client_encoding: 'UTF8'
});

export const db = drizzle(pool);
