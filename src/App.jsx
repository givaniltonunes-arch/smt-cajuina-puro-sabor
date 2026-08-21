import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

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
            <span>Imagem da Cajuína</span>
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
            <span>Nossa tradição</span>
          </div>
        </section>

        <section id="processo" className="processo">
          <span className="section-label">Como fazemos</span>

          <h2>Nosso Processo Artesanal</h2>

          <p className="section-intro">
            Cuidado e tradição em cada etapa da produção.
          </p>

          <div className="processo-etapas">
            <div>
              <strong>1</strong>
              <h3>Seleção do Caju</h3>
              <p>Escolha cuidadosa dos frutos para garantir qualidade.</p>
            </div>

            <div>
              <strong>2</strong>
              <h3>Preparo Artesanal</h3>
              <p>Produção que preserva a tradição da cajuína piauiense.</p>
            </div>

            <div>
              <strong>3</strong>
              <h3>Produto Final</h3>
              <p>Sabor, qualidade e tradição prontos para chegar à mesa.</p>
            </div>
          </div>
        </section>

        <section className="destaque">
          <h2>Tradição, processo e qualidade</h2>
          <p>
            Uma bebida que representa a cultura e a identidade do Piauí.
          </p>
        </section>

        <section id="contato" className="cta">
          <h2>Quer levar a Cajuína Puro Sabor para o seu estabelecimento?</h2>

          <p>
            Entre em contato conosco e conheça nossas possibilidades de parceria.
          </p>

          <a href="#contato" className="secondary-button">
            Fale Conosco
          </a>
        </section>

      </main>

      <Footer />
    </>
  )
}

export default App