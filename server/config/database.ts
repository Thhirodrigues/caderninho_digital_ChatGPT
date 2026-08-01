import mysql from "mysql2/promise";

const rawDatabaseUrl =
  process.env.DATABASE_URL ||
  "mysql://root:password@localhost:3306/caderninho";

const cleanDatabaseUrl = rawDatabaseUrl.replace(/\?ssl=.*$/, "");

export const pool = mysql.createPool({
  uri: cleanDatabaseUrl,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  ssl: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2",
  } as any,
} as any);

export async function initializeDatabase() {
  try {
    console.log("[DB] Conectando...");
    const connection = await pool.getConnection();
    connection.release();
    console.log("[DB] Banco conectado.");
  } catch (error: any) {
    console.error("[DB] Erro:", error?.message || error);
    throw error;
  }
}
