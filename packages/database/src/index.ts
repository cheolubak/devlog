import { Pool, QueryResult, QueryResultRow } from 'pg';

console.log('=======process.env.DATABASE_URL=======', process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 30000,
  max: 20,
});

export const query = async <T extends QueryResultRow = any>(
  text: string,
  params?: any[],
): Promise<QueryResult<T>> => {
  const start = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'production') {
      console.log('executed query', { duration, rows: res.rowCount, text });
    }
    return res;
  } catch (error) {
    console.error('Error executing query', { error, text });
    throw error;
  }
};

export const getClient = async () => {
  const client = await pool.connect();
  return client;
};

export default pool;
