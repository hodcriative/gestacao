import { Heart, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import './Painel.css'

export default function Painel() {
  const { usuario, sair } = useAuth()
  const navegar = useNavigate()

  function aoSair() {
    sair()
    navegar('/login', { replace: true })
  }

  return (
    <main className="painel">
      <div className="painel-cartao">
        <span className="painel-icone"><Heart size={22} /></span>
        <h1>Olá, {usuario?.nome}!</h1>
        <p>
          Seu login funcionou. O painel da gestação, com semanas, consultas e
          diário, chega nas próximas etapas.
        </p>
        <button type="button" className="painel-sair" onClick={aoSair}>
          <LogOut size={17} /> Sair
        </button>
      </div>
    </main>
  )
}
