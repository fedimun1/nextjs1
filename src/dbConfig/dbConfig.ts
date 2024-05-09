import mysql from 'mysql2/promise';

interface PoolConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

// Create a cache object to store the connection pool (optional)
let cachedPool: mysql.Pool | undefined;

const createPool = async (): Promise<mysql.Pool> => {
  if (!cachedPool) { // Check if pool is already created
    cachedPool = mysql.createPool<PoolConfig>({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    cachedPool.on('connect', (connection) => {
      console.log('New MySQL connection established:', connection.threadId);
    });
  }

  return cachedPool;
};

export const getConnection = async (): Promise<mysql.Connection> => {
  try {
    const pool = await createPool();
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('Error getting connection from pool:', error);
    throw error; // Re-throw the error to propagate it
  }
};

export default createPool; // Export createPool for potential reuse
