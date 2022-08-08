import pg from "pg";
import { query } from "../index.js";
export {pool};

const connectionString = process.env.PGURL;

const pool = new pg.Pool({
 connectionString,
ssl: { rejectUnauthorized: false }});
await pool.connect();

const query = await pool.query('SELECT NOW()');
console.log(query);