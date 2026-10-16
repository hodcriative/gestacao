import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { pool } from './db.js'
import rotasAuth from './rotas-auth.js'

if (!process.env.JWT_SECRET) {
  console.error('Falta o JWT_SECRET no arquivo .env')
  process.exit(1)
}

const app = express()

// Somente estes enderecos podem chamar a API pelo navegador
const origensPermitidas = (process.env.CORS_ORIGENS ?? 'http://localhost:5173')
  .split(',')
  .map((origem) => origem.trim())

app.use(cors({ origin: origensPermitidas }))
app.use(express.json())

// Rota de teste: pergunta a hora ao banco para provar que a conexao funciona
app.get('/saude', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW() AS agora')
    res.json({ ok: true, banco: rows[0].agora })
  } catch (erro) {
    console.error('Erro ao consultar o banco:', erro.message)
    res.status(500).json({ ok: false })
  }
})

app.use('/auth', rotasAuth)

const porta = process.env.PORT || 3000
app.listen(porta, () => console.log(`API rodando na porta ${porta}`))
