import { createContext, useContext } from 'react'
import type { Usuario } from './api'

export type AuthContextValor = {
  usuario: Usuario | null
  carregando: boolean
  entrar: (email: string, senha: string) => Promise<void>
  sair: () => void
}

export const AuthContext = createContext<AuthContextValor | null>(null)

export function useAuth(): AuthContextValor {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth precisa estar dentro do AuthProvider')
  return contexto
}
