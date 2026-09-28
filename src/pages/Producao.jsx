function Producao() {
  const etapas = [
    {
      titulo: "Produção Artesanal",
      descricao:
        "A produção da cajuína preserva técnicas tradicionais, valorizando o cuidado artesanal e a cultura piauiense.",
    },
    {
      titulo: "Processo de Filtragem",
      descricao:
        "A filtragem contribui para a aparência característica da bebida e para a obtenção de um produto de qualidade.",
    },
    {
      titulo: "Pasteurização e Qualidade",
      descricao:
        "A pasteurização é uma etapa importante para a conservação da cajuína, mantendo suas características e sua qualidade.",
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
          <article className="producao-card" key={index}>
            <div className="producao-midia" aria-hidden="true">
              <span>Etapa {index + 1}</span>
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