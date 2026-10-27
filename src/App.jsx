
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import Produtos from './pages/Produtos'
import Contato from './pages/Contato'
import Producao from './pages/Producao'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Carrinho from './pages/Carrinho'
import Admin from './pages/Admin'

function App() {
  return (
    <>
      <Header />

      <main id="inicio">
        <section className="hero">
          <div className="hero-text">
            <span className="hero-label">Tradição piauiense</span>

            <h1>Cajuína Puro Sabor</h1>

            <p>
              Uma tradição que atravessa gerações, levando o sabor
              e a cultura do Piauí para cada mesa.
            </p>

            <a href="#historia" className="primary-button">
              Conheça nossa história
            </a>
          </div>

          <div className="hero-visual">
            <img
              src="/imagens/cajuina-puro-sabor.png"
              alt="Cajuína Puro Sabor"
            />
          </div>
        </section>

        <section id="historia" className="historia">
          <div className="historia-text">
            <span className="section-label">Nossa História</span>

            <h2>Tradição e sabor que fazem parte do Piauí</h2>

            <p>
              A cajuína é uma bebida tradicional piauiense, produzida
              a partir do caju e reconhecida por seu sabor único e por
              sua importância cultural.
            </p>

            <p>
              O projeto SMT Cajuína Puro Sabor valoriza essa tradição,
              preservando sua história e aproximando esse patrimônio
              cultural de novos públicos por meio da tecnologia.
            </p>
          </div>

          <div className="historia-visual">
            <img
              src="/imagens/nossa-tradicao.png"
              alt="Cajuína Puro Sabor, tradição do Piauí"
            />
          </div>
        </section>

        <section id="processo" className="processo">
          <span className="section-label">Nosso processo</span>

          <h2>Processo Produtivo</h2>

          <p className="section-intro">
            Tradição, cuidado e qualidade em cada etapa da produção da cajuína.
          </p>

          <div className="processo-detalhes">
            <div className="processo-item">
              <div className="processo-texto">
                <h3>Produção Artesanal</h3>

                <p>
                  A produção da cajuína preserva técnicas tradicionais,
                  valorizando o cuidado artesanal e a cultura piauiense.
                </p>
              </div>

              <div className="processo-midia">
                <img
                  src="/imagens/producao-artesanal.png"
                  alt="Produção artesanal da cajuína com cajus frescos"
                />
              </div>
            </div>

            <div className="processo-item">
              <div className="processo-texto">
                <h3>Processo de Filtragem</h3>

                <p>
                  A filtragem contribui para a aparência característica da
                  bebida e para a obtenção de um produto de qualidade.
                </p>
              </div>

                            <div className="processo-midia">
                <img
                  src="/imagens/processo-filtragem.png"
                  alt="Processo de filtragem da cajuína"
                />
              </div>
            </div>

            <div className="processo-item">
              <div className="processo-texto">
                <h3>Pasteurização e Qualidade</h3>

                <p>
                  A pasteurização é uma etapa importante para a conservação
                  da cajuína, mantendo suas características e sua qualidade.
                </p>
              </div>

              <div className="processo-midia">
  <img
    src="/imagens/pasteurizacao-qualidade.png"
    alt="Pasteurização das garrafas de cajuína"
  />
</div>
            </div>
          </div>
        </section>

                <section className="destaque">
          <img
            src="/imagens/destaque-cajuina.png"
            alt="Cajuína Puro Sabor, tradição e cultura do Piauí"
          />
        </section>

        <section id="contato" className="cta">
          <h2>
            Quer levar a Cajuína Puro Sabor para o seu estabelecimento?
          </h2>

          <p>
            Entre em contato conosco e conheça nossas possibilidades de parceria.
          </p>

          <a href="#contato-formulario" className="secondary-button">
            Fale Conosco
          </a>
        </section>
      </main>

      <Produtos />
      <Contato />
      <Producao />
      <Login />
      <Cadastro />
      <Carrinho />
      <Admin />

      <Footer />
    </>
  )
}

export default App
