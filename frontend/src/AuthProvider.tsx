import { useEffect, useState, type ReactNode } from 'react'
import { api, apagarToken, ErroApi, lerToken, salvarToken, type Usuario } from './api'
import { AuthContext } from './AuthContext'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [carregando, setCarregando] = useState(() => lerToken() !== null)

  // Ao abrir o site, se houver um token guardado, confere se ele ainda vale
  useEffect(() => {
    if (lerToken() === null) return

    api
      .eu()
      .then(({ usuario }) => setUsuario(usuario))
      .catch((erro) => {
        // Só descarta o token se o servidor disse que ele é inválido
        if (erro instanceof ErroApi && erro.status === 401) apagarToken()
      })
      .finally(() => setCarregando(false))
  }, [])

  async function entrar(email: string, senha: string) {
    const { token, usuario } = await api.login(email, senha)
    salvarToken(token)
    setUsuario(usuario)
  }

  function sair() {
    apagarToken()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  )
}
