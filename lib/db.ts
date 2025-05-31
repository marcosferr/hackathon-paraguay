import { Pool } from "@neondatabase/serverless";

// Crear un pool de conexiones a la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Función para ejecutar consultas SQL
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error("Database query error:", {
      text,
      params,
      error: error instanceof Error ? error.message : error,
    });
    throw error;
  }
}

// Función para obtener un solo registro
export async function getById(table: string, id: string) {
  const result = await query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
  return result.rows[0];
}

// Función para obtener múltiples registros
export async function getAll(
  table: string,
  condition?: string,
  params?: any[]
) {
  let sql = `SELECT * FROM ${table}`;
  if (condition) {
    // If condition starts with ORDER BY, append it directly
    if (condition.trim().toUpperCase().startsWith("ORDER BY")) {
      sql += ` ${condition}`;
    } else {
      sql += ` WHERE ${condition}`;
    }
  }
  const result = await query(sql, params);
  return result.rows;
}

// Función para insertar un registro
export async function insert(table: string, data: Record<string, any>) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
  const columns = keys.join(", ");

  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
  const result = await query(sql, values);
  return result.rows[0];
}

// Función para actualizar un registro
export async function update(
  table: string,
  id: string,
  data: Record<string, any>
) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");

  const sql = `UPDATE ${table} SET ${setClause} WHERE id = $${
    keys.length + 1
  } RETURNING *`;
  const result = await query(sql, [...values, id]);
  return result.rows[0];
}

// Función para eliminar un registro
export async function remove(table: string, id: string) {
  const sql = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
  const result = await query(sql, [id]);
  return result.rows[0];
}
