
function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-marca">
          <strong>Cajuína Puro Sabor</strong>
          <p>Tradição, qualidade e sabor do Piauí.</p>
        </div>

        <nav className="footer-links" aria-label="Navegação do rodapé">
          <a href="#inicio">Início</a>
          <a href="#historia">Nossa História</a>
          <a href="#processo">Processo</a>
          <a href="#contato-formulario">Contato</a>
        </nav>

        <div className="footer-direitos">
          <p>© 2026 SMT Cajuína Puro Sabor</p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
