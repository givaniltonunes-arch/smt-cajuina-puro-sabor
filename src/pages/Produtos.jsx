import { useEffect, useState } from "react";function Produtos() {
  const produtos = [
    {
      nome: "Cajuína Tradicional",
      descricao: "Cajuína Puro Sabor",
    },
    {
      nome: "Cajuína Premium",
      descricao: "Cajuína Puro Sabor",
    },
    {
      nome: "Cajuína Especial",
      descricao: "Cajuína Puro Sabor",
    },
  ];
const [produtosApi, setProdutosApi] = useState([]);useEffect(() => {
  fetch("http://localhost:3000/produtos")
    .then((res) => res.json())
    .then((dados) => setProdutosApi(dados))
    .catch((erro) => console.error("Erro ao buscar produtos:", erro));
}, []);
  return (
    <main>
      <section className="produtos-intro">
        <h1>Nossos Produtos</h1>
        <p>Conheça os produtos da SMT Cajuína Puro Sabor.</p>
      </section>

      <section className="produtos-lista">
        {(produtosApi.length > 0 ? produtosApi : produtos).map((produto, index) => (
          <article className="produto-card" key={index}>
            <div className="produto-imagem" aria-hidden="true">
              <span>Cajuína</span>
            </div>

            <div className="produto-conteudo">
              <h2>{produto.nome}</h2>
              <p>{produto.descricao}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Produtos;