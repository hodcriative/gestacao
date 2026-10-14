import pg from 'pg'

const { Pool } = pg

// O Pool mantem conexoes abertas com o banco e as reutiliza
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
