import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Heart,
  LockKeyhole,
  Mail,
  UserRound,
} from 'lucide-react'
import './AuthPage.css'

type AuthMode = 'login' | 'register' | 'forgot'

type AuthPageProps = {
  mode: AuthMode
}

const pageContent = {
  login: {
    eyebrow: 'BOM TER VOCÊ AQUI',
    title: 'Que bom ter você de volta.',
    description: 'Entre na sua conta para continuar vivendo essa jornada.',
    button: 'Entrar na minha conta',
    footerText: 'Ainda não tem uma conta?',
    footerLink: 'Criar minha conta',
    footerHref: '/cadastro',
  },
  register: {
    eyebrow: 'TUDO COMEÇA AQUI',
    title: 'Vamos começar essa história?',
    description: 'Crie sua conta para preparar um lugar especial para suas memórias.',
    button: 'Criar minha conta',
    footerText: 'Já tem uma conta?',
    footerLink: 'Entrar',
    footerHref: '/login',
  },
  forgot: {
    eyebrow: 'VAMOS RESOLVER ISSO',
    title: 'Vamos recuperar seu acesso.',
    description: 'Informe seu e-mail para iniciar a recuperação da sua conta.',
    button: 'Solicitar recuperação',
    footerText: 'Lembrou da senha?',
    footerLink: 'Voltar para o login',
    footerHref: '/login',
  },
}

function AuthPage({ mode }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState('')
  const content = pageContent[mode]

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setNotice(
      'Esta tela ainda não está conectada ao servidor. A autenticação real será habilitada após a integração com o backend.',
    )
  }

  return (
    <main className="auth-page">
      <section className="auth-story">
        <Link to="/" className="auth-brand">
          <span className="auth-brand-icon"><Heart size={21} /></span>
          <span>nossa <strong>gestação</strong></span>
        </Link>

        <div className="auth-story-content">
          <span className="auth-story-kicker">UMA JORNADA DE AMOR</span>
          <h1>
            Cada pequeno momento
            <br />
            faz parte de uma
            <br />
            <em>grande história.</em>
          </h1>
          <p>
            Um espaço para acompanhar, compartilhar e guardar tudo
            o que torna essa fase inesquecível.
          </p>
          <div className="auth-story-decoration">
            <Heart size={19} />
            <span>Um amor que cresce a cada dia.</span>
          </div>
        </div>

        <span className="auth-story-footer">
          Feito com carinho para essa nova etapa da vida.
        </span>
      </section>

      <section className="auth-form-section">
        <Link to="/" className="auth-back-link">
          <ArrowLeft size={17} /> Voltar ao início
        </Link>

        <div className="auth-form-container">
          <div className="auth-mobile-mark">
            <span className="auth-brand-icon"><Heart size={21} /></span>
            <span>nossa <strong>gestação</strong></span>
          </div>

          <div className="auth-heading">
            <span className="auth-eyebrow">{content.eyebrow}</span>
            <h2>{content.title}</h2>
            <p>{content.description}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="auth-field">
                <label htmlFor="name">Como podemos chamar você?</label>
                <div className="auth-input-wrap">
                  <UserRound size={18} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    autoComplete="name"
                    minLength={2}
                    required
                  />
                </div>
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="email">E-mail</label>
              <div className="auth-input-wrap">
                <Mail size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="voce@exemplo.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="auth-field">
                <label htmlFor="password">Senha</label>
                <div className="auth-input-wrap">
                  <LockKeyhole size={18} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={mode === 'register' ? 'Crie uma senha' : 'Sua senha'}
                    autoComplete={
                      mode === 'register' ? 'new-password' : 'current-password'
                    }
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {mode === 'register' && (
                  <span className="auth-field-hint">
                    Utilize pelo menos 8 caracteres.
                  </span>
                )}
              </div>
            )}

            {mode === 'login' && (
              <div className="auth-forgot-row">
                <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
              </div>
            )}

            <button className="auth-submit" type="submit">
              {content.button}
            </button>

            {notice && (
              <p className="auth-notice" role="status">
                {notice}
              </p>
            )}
          </form>

          <div className="auth-switch">
            <span>{content.footerText}</span>
            <Link to={content.footerHref}>{content.footerLink}</Link>
          </div>

          <p className="auth-privacy">
            <LockKeyhole size={14} />
            Seus dados devem ser tratados com cuidado e privacidade.
          </p>
        </div>
      </section>
    </main>
  )
}

export default AuthPage