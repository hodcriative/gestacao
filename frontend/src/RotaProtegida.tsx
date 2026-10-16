import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function RotaProtegida({ children }: { children: ReactNode }) {
  const { usuario, carregando } = useAuth()

  if (carregando) return <p className="painel-carregando">Carregando…</p>
  if (!usuario) return <Navigate to="/login" replace />

  return <>{children}</>
}
