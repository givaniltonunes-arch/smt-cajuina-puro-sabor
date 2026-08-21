function Header() {
  return (
    <header>
      <div className="header-container">
        <a className="brand" href="#inicio">
          Cajuína Puro Sabor
        </a>

        <nav aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <a href="#historia">Nossa História</a>
          <a href="#processo">Processo</a>
          <a href="#contato">Contato</a>
        </nav>

        <a className="header-button" href="#contato">
          Fale Conosco
        </a>
      </div>
    </header>
  );
}

export default Header;