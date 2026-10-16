import 'dotenv/config'
import readline from 'node:readline/promises'
import bcrypt from 'bcryptjs'
import { pool } from './db.js'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

try {
  const nome = (await rl.question('Nome: ')).trim()
  const email = (await rl.question('E-mail: ')).trim().toLowerCase()
  const senha = await rl.question('Senha (minimo 8 caracteres): ')
  const idInformado = (await rl.question('ID da gestacao (Enter para criar uma nova): ')).trim()

  if (!nome || !email.includes('@') || senha.length < 8) {
    throw new Error('Dados invalidos: confira nome, e-mail e o tamanho da senha.')
  }

  let gestacaoId
  if (idInformado === '') {
    const { rows } = await pool.query('INSERT INTO gestacoes DEFAULT VALUES RETURNING id')
    gestacaoId = rows[0].id
    console.log(`Gestacao criada com o ID ${gestacaoId}.`)
  } else {
    gestacaoId = Number(idInformado)
    const { rowCount } = await pool.query('SELECT 1 FROM gestacoes WHERE id = $1', [gestacaoId])
    if (!Number.isInteger(gestacaoId) || rowCount === 0) {
      throw new Error('Gestacao nao encontrada.')
    }
  }

  const senhaHash = await bcrypt.hash(senha, 12)
  await pool.query(
    'INSERT INTO usuarios (gestacao_id, nome, email, senha_hash) VALUES ($1, $2, $3, $4)',
    [gestacaoId, nome, email, senhaHash],
  )
  console.log(`Usuario ${email} criado na gestacao ${gestacaoId}.`)
} catch (erro) {
  console.error('Erro:', erro.message)
  process.exitCode = 1
} finally {
  rl.close()
  await pool.end()
}
