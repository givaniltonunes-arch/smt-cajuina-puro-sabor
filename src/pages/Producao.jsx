
function Producao() {
  const etapas = [
    {
      titulo: "Produção Artesanal",
      descricao:
        "A produção da cajuína preserva técnicas tradicionais, valorizando o cuidado artesanal e a cultura piauiense.",
      imagem: "/imagens/producao-artesanal.png",
      alt: "Produção artesanal da cajuína com cajus frescos",
    },
    {
      titulo: "Processo de Filtragem",
      descricao:
        "A filtragem contribui para a aparência característica da bebida e para a obtenção de um produto de qualidade.",
      imagem: "/imagens/processo-filtragem.png",
      alt: "Processo de filtragem da cajuína",
    },
    {
      titulo: "Pasteurização e Qualidade",
      descricao:
        "A pasteurização é uma etapa importante para a conservação da cajuína, mantendo suas características e sua qualidade.",
      imagem: "/imagens/pasteurizacao-qualidade.png",
      alt: "Pasteurização e controle de qualidade da cajuína",
    },
  ];

  return (
    <main>
      <section className="producao-intro">
        <span className="section-label">Nosso processo</span>
        <h1>Produção da Cajuína</h1>
        <p>
          Conheça as principais etapas que fazem parte da produção da
          Cajuína Puro Sabor.
        </p>
      </section>

      <section className="producao-etapas">
        {etapas.map((etapa, index) => (
          <article className="producao-card" key={etapa.titulo}>
            <div className="producao-midia">
              <img src={etapa.imagem} alt={etapa.alt} />
            </div>

            <div className="producao-conteudo">
              <h2>{etapa.titulo}</h2>
              <p>{etapa.descricao}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Producao;
