import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { pool } from './db.js'

const app = express()

app.use(cors())          // por enquanto aberto; vamos restringir na publicacao
app.use(express.json())  // permite receber JSON nas requisicoes

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

const porta = process.env.PORT || 3000
app.listen(porta, () => console.log(`API rodando na porta ${porta}`))
