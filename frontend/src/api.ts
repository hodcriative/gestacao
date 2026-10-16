// Endereco da API: vem do arquivo .env.development (local) ou .env.production (publicado)
const API_URL = String(import.meta.env.VITE_API_URL ?? 'http://localhost:3000').replace(/\/$/, '')

const CHAVE_TOKEN = 'nossa-gestacao:token'

export type Usuario = {
  id: number
  nome: string
  email: string
  gestacao_id?: number | null
}

export class ErroApi extends Error {
  status: number

  constructor(mensagem: string, status: number) {
    super(mensagem)
    this.status = status
  }
}

export function lerToken(): string | null {
  try {
    return localStorage.getItem(CHAVE_TOKEN)
  } catch {
    return null
  }
}

export function salvarToken(token: string) {
  try {
    localStorage.setItem(CHAVE_TOKEN, token)
  } catch {
    // armazenamento bloqueado: o login vale so ate fechar a pagina
  }
}

export function apagarToken() {
  try {
    localStorage.removeItem(CHAVE_TOKEN)
  } catch {
    // nada a fazer
  }
}

async function requisicao<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  const token = lerToken()
  const cabecalhos: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) cabecalhos.Authorization = `Bearer ${token}`

  let resposta: Response
  try {
    resposta = await fetch(`${API_URL}${caminho}`, { ...opcoes, headers: cabecalhos })
  } catch {
    throw new ErroApi(
      'Não foi possível falar com o servidor. Tente novamente em instantes.',
      0,
    )
  }

  const dados = await resposta.json().catch(() => ({}))
  if (!resposta.ok) {
    throw new ErroApi(dados.erro ?? 'Algo deu errado. Tente novamente.', resposta.status)
  }
  return dados as T
}

export const api = {
  login: (email: string, senha: string) =>
    requisicao<{ token: string; usuario: Usuario }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    }),
  eu: () => requisicao<{ usuario: Usuario }>('/auth/eu'),
}
