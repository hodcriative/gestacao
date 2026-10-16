import { useState } from 'react'
import {
ArrowDown,
ArrowRight,
BookHeart,
CalendarDays,
Heart,
Images,
Menu,
ShieldCheck,
Sparkles,
Users,
X,
} from 'lucide-react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './AuthPage'
import AuthProvider from './AuthProvider'
import Painel from './Painel'
import RotaProtegida from './RotaProtegida'
import './App.css'

const features = [

  {
    icon: CalendarDays,
    title: 'Acompanhe cada semana',
    description:
      'Descubra a evolução da gestação e acompanhe essa jornada com mais tranquilidade.',
    number: '01',
  },
  {
    icon: BookHeart,
    title: 'Guarde suas memórias',
    description:
      'Registre sentimentos, histórias e momentos que merecem ser lembrados para sempre.',
    number: '02',
  },
  {
    icon: Users,
    title: 'Vivam isso juntos',
    description:
      'Compartilhe a jornada com seu parceiro e fortaleça a conexão da família.',
    number: '03',
  },
  {
    icon: Images,
    title: 'Reviva cada momento',
    description:
      'Organize fotos, lembranças e pequenas conquistas em um só lugar especial.',
    number: '04',
  },
]

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-wrapper">
      <header className="site-header">
        <a className="brand" href="#inicio" onClick={closeMenu}>
          <span className="brand-icon">
            <Heart size={21} strokeWidth={1.8} />
          </span>
          <span>
            nossa <strong>gestação</strong>
          </span>
        </a>

       <button
className="mobile-menu-toggle"
type="button"
aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
aria-expanded={menuOpen}
onClick={() => setMenuOpen(!menuOpen)}

>

{menuOpen ? <X size={23} /> : <Menu size={23} />} </button>

<nav className={`navigation ${menuOpen ? 'navigation-open' : ''}`}>
  <a href="#inicio" onClick={closeMenu}>Início</a>
  <a href="#sobre" onClick={closeMenu}>Nossa proposta</a>
  <a href="#recursos" onClick={closeMenu}>Funcionalidades</a>
  <a href="#jornada" onClick={closeMenu}>A jornada</a>

<Link to="/login" onClick={closeMenu}>Entrar</Link>

  <Link className="nav-cta" to="/login" onClick={closeMenu}>
    Começar agora <ArrowRight size={16} />
  </Link>
</nav>
</header>


      <main>
        <section className="hero" id="inicio">
          <div className="hero-decoration decoration-one" />
          <div className="hero-decoration decoration-two" />

          <div className="hero-content">
            <div className="eyebrow">
              <Sparkles size={15} />
              <span>Um amor que cresce a cada dia</span>
            </div>

            <h1>
              Nove meses.
              <br />
              <span>Uma vida inteira</span>
              <br />
              de amor.
            </h1>

            <p className="hero-description">
              Um lugar especial para acompanhar a gestação, guardar
              memórias e viver cada descoberta lado a lado.
            </p>

            <div className="hero-actions" id="comecar">
              <a className="button button-primary" href="#recursos">
                Conheça a plataforma <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href="#sobre">
                Descubra nossa proposta
              </a>
            </div>

            <div className="hero-note">
              <span className="avatar-stack" aria-hidden="true">
                <span><Heart size={14} /></span>
                <span><Users size={14} /></span>
              </span>
              <p>Uma jornada compartilhada, memórias para sempre.</p>
            </div>
          </div>

          <div className="hero-visual" aria-label="Ilustração decorativa de uma família">
            <div className="visual-halo" />
            <div className="visual-card">
              <div className="visual-topline">
                <span className="tiny-heart"><Heart size={16} fill="currentColor" /></span>
                <span>Um novo capítulo</span>
                <Sparkles size={17} />
              </div>

              <div className="family-illustration">
                <div className="sun-shape" />
                <div className="plant plant-left"><i /><i /><i /></div>
                <div className="plant plant-right"><i /><i /><i /></div>

                <div className="parent parent-left">
                  <div className="parent-hair" />
                  <div className="parent-head" />
                  <div className="parent-body">
                    <div className="parent-arm" />
                  </div>
                </div>

                <div className="parent parent-right">
                  <div className="parent-hair" />
                  <div className="parent-head" />
                  <div className="parent-body">
                    <div className="parent-arm" />
                  </div>
                </div>

                <div className="baby-bump">
                  <Heart size={27} fill="currentColor" strokeWidth={1.2} />
                </div>

                <div className="baby-sparkle sparkle-left">✳</div>
                <div className="baby-sparkle sparkle-right">✦</div>
              </div>

              <div className="visual-caption">
                <span className="caption-icon"><Heart size={18} /></span>
                <div>
                  <strong>O amor está crescendo</strong>
                  <p>Os pequenos momentos são os maiores.</p>
                </div>
              </div>
            </div>

            <div className="floating-note note-top">
              <span><Heart size={17} fill="currentColor" /></span>
              <div><strong>Nosso bebê</strong><small>Nosso maior sonho</small></div>
            </div>

            <div className="floating-note note-bottom">
              <span><BookHeart size={18} /></span>
              <div><strong>Memórias únicas</strong><small>Para guardar com carinho</small></div>
            </div>
          </div>

          <a href="#sobre" className="scroll-cue" aria-label="Rolar para conhecer a proposta">
            <ArrowDown size={18} />
          </a>
        </section>

        <section className="intro-section" id="sobre">
          <div className="section-kicker">MAIS QUE ACOMPANHAR</div>
          <h2>
            Uma jornada tão única
            <br />
            merece um lugar <span>especial.</span>
          </h2>
          <p>
            A gestação é feita de descobertas, expectativas, mudanças e
            sentimentos que nem sempre cabem em fotografias. O Nossa
            Gestação nasceu para acolher tudo isso em um espaço só de vocês.
          </p>
          <div className="intro-heart"><Heart size={22} /></div>
        </section>

        <section className="features-section" id="recursos">
          <div className="section-heading">
            <div>
              <div className="section-kicker">FEITO PARA VOCÊS</div>
              <h2>Pequenos detalhes.<br /><span>Grandes lembranças.</span></h2>
            </div>
            <p>
              Tudo o que importa nessa fase, reunido em um espaço
              acolhedor, organizado e pensado para compartilhar.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <article className="feature-card" key={feature.number}>
                  <div className="feature-card-top">
                    <span className="feature-icon"><Icon size={23} strokeWidth={1.7} /></span>
                    <span className="feature-number">{feature.number}</span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <span className="feature-line" />
                </article>
              )
            })}
          </div>
        </section>

        <section className="journey-section" id="jornada">
          <div className="journey-copy">
            <div className="section-kicker">CADA FASE IMPORTA</div>
            <h2>
              O agora passa.
              <br />
              <span>As memórias ficam.</span>
            </h2>
            <p>
              Entre uma consulta e outra, uma nova descoberta e um sonho
              compartilhado, existe uma história sendo escrita. Que tal
              guardar cada capítulo dela?
            </p>
            <a className="text-link" href="#comecar">
              Essa história é de vocês <ArrowRight size={18} />
            </a>
          </div>

          <div className="journey-quote">
            <span className="quote-mark">“</span>
            <p>
              Ainda não conhecemos seu rostinho, mas você já transformou
              tudo dentro de nós.
            </p>
            <span className="quote-heart"><Heart size={18} fill="currentColor" /></span>
            <small>UM AMOR QUE JÁ EXISTE</small>
          </div>
        </section>

        <section className="privacy-strip">
          <div className="privacy-icon"><ShieldCheck size={25} /></div>
          <div>
            <h3>Uma história íntima merece cuidado.</h3>
            <p>
              Privacidade e segurança devem fazer parte de cada detalhe
              da experiência de vocês.
            </p>
          </div>
        </section>

        <section className="final-cta">
          <div className="cta-decoration">✳</div>
          <div className="section-kicker">O PRIMEIRO CAPÍTULO</div>
          <h2>Vamos guardar essa história?</h2>
          <p>
            Cada dia é parte de algo extraordinário.<br />
            Façam dessa jornada uma lembrança para a vida inteira.
          </p>
          <Link className="button button-light" to="/login">
            Vamos começar <Heart size={17} />
          </Link>
          <span className="cta-bottom-heart"><Heart size={20} /></span>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-icon"><Heart size={19} /></span>
          <span>nossa <strong>gestação</strong></span>
        </a>
        <p>Feito com carinho para uma das maiores aventuras da vida.</p>
        <span className="footer-copyright">© {new Date().getFullYear()} Nossa Gestação</span>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<AuthPage mode="login" />}
        />
        <Route path="/cadastro" element={<Navigate to="/login" replace />} />
        <Route
          path="/painel"
          element={
            <RotaProtegida>
              <Painel />
            </RotaProtegida>
          }
        />
        <Route
          path="/recuperar-senha"
          element={<AuthPage mode="forgot" />}
        />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App