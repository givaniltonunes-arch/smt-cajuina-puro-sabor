import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <Header />

      <main id="inicio">
        <section id="sobre">
          <h3>Tradição e sabor que fazem parte do Piauí</h3>
          <p>A cajuína é uma bebida tradicional piauiense, produzida a partir do caju e reconhecida por seu sabor único e por sua importância cultural.</p>
          <h3>Nossa História</h3>
          <p>O projeto SMT Cajuína Puro Sabor valoriza a tradição da cajuína piauiense, preservando sua história e aproximando esse patrimônio cultural de novos públicos por meio da tecnologia.</p>
          
          <h2>SMT Cajuína Puro Sabor</h2>
          <p>
            Bem-vindo ao nosso espaço digital. Conheça nossa história,
            nossos produtos e a tradição da cajuína piauiense.
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App