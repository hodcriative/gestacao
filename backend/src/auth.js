import jwt from 'jsonwebtoken'

// Middleware: exige um token valido no cabecalho Authorization: Bearer <token>
export function exigirLogin(req, res, next) {
  const cabecalho = req.headers.authorization ?? ''
  const [tipo, token] = cabecalho.split(' ')

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ erro: 'Nao autenticado.' })
  }

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = { id: dados.sub, gestacaoId: dados.gestacaoId }
    next()
  } catch {
    res.status(401).json({ erro: 'Sessao invalida ou expirada.' })
  }
}
