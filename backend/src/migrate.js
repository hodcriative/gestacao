import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { pool } from './db.js'

const sql = await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8')

try {
  await pool.query(sql)
  console.log('Tabelas criadas/atualizadas com sucesso.')
} catch (erro) {
  console.error('Erro ao criar as tabelas:', erro.message)
  process.exitCode = 1
} finally {
  await pool.end()
}
