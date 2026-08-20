import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <Header />

      <main id="inicio">
        <section id="sobre">
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