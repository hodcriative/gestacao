import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import { pool } from './db.js'
import { exigirLogin } from './auth.js'

const rotas = Router()

// Hash de mentira, usado para o tempo de resposta ser igual quando o e-mail nao existe
const HASH_FALSO = bcrypt.hashSync('senha-qualquer', 12)

// No maximo 10 tentativas de login por IP a cada 15 minutos
const limitarLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { erro: 'Muitas tentativas. Tente de novo em alguns minutos.' },
})

rotas.post('/login', limitarLogin, async (req, res) => {
  const { email, senha } = req.body ?? {}

  if (typeof email !== 'string' || typeof senha !== 'string') {
    return res.status(400).json({ erro: 'Informe e-mail e senha.' })
  }

  try {
    const { rows } = await pool.query(
      'SELECT id, nome, email, senha_hash, gestacao_id FROM usuarios WHERE LOWER(email) = LOWER($1)',
      [email.trim()],
    )
    const usuario = rows[0]

    const senhaConfere = await bcrypt.compare(senha, usuario?.senha_hash ?? HASH_FALSO)
    if (!usuario || !senhaConfere) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos.' })
    }

    const token = jwt.sign(
      { sub: usuario.id, gestacaoId: usuario.gestacao_id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    )

    res.json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    })
  } catch (erro) {
    console.error('Erro no login:', erro.message)
    res.status(500).json({ erro: 'Erro interno.' })
  }
})

// Quem esta logado? O frontend usa isso para saber se a sessao ainda vale
rotas.get('/eu', exigirLogin, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, nome, email, gestacao_id FROM usuarios WHERE id = $1',
      [req.usuario.id],
    )
    if (!rows[0]) return res.status(401).json({ erro: 'Usuario nao encontrado.' })
    res.json({ usuario: rows[0] })
  } catch (erro) {
    console.error('Erro em /auth/eu:', erro.message)
    res.status(500).json({ erro: 'Erro interno.' })
  }
})

export default rotas
