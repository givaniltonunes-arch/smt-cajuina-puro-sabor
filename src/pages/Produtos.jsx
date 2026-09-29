import { useEffect, useState } from "react";

function Produtos() {
  const produtosPadrao = [
    {
      nome: "Cajuína Tradicional",
      descricao: "Cajuína Puro Sabor",
      preco: "15",
    },
    {
      nome: "Cajuína Premium",
      descricao: "Cajuína Puro Sabor",
      preco: "18",
    },
    {
      nome: "Cajuína Especial",
      descricao: "Cajuína Puro Sabor",
      preco: "20",
    },
  ];

  const [produtosApi, setProdutosApi] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/produtos")
      .then((res) => res.json())
      .then((dados) => setProdutosApi(dados))
      .catch((erro) => console.error("Erro ao buscar produtos:", erro));
  }, []);

  function adicionarAoCarrinho(produto) {
    const carrinhoAtual = JSON.parse(
      localStorage.getItem("carrinho") || "[]"
    );

    const produtoExistente = carrinhoAtual.find(
      (item) => item.id === produto.id
    );

    if (!produtoExistente) {
      carrinhoAtual.push({
        ...produto,
        quantidade: 1,
      });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

alert(`${produto.nome} foi adicionado ao carrinho.`);

window.dispatchEvent(new Event("carrinhoAtualizado"));
  }

  const listaProdutos =
    produtosApi.length > 0 ? produtosApi : produtosPadrao;

  return (
    <main>
      <section className="produtos-intro">
        <h1>Nossos Produtos</h1>
        <p>Conheça os produtos da SMT Cajuína Puro Sabor.</p>
      </section>

      <section className="produtos-lista">
        {listaProdutos.map((produto, index) => (
          <article className="produto-card" key={produto.id || index}>
            <div className="produto-imagem" aria-hidden="true">
              <span>Cajuína</span>
            </div>

            <div className="produto-conteudo">
              <h2>{produto.nome}</h2>

              <p>
                {produto.descricao || "Cajuína Puro Sabor"}
              </p>

              <p>
                <strong>
                  R$ {Number(produto.preco || 0).toFixed(2).replace(".", ",")}
                </strong>
              </p>

              <button
                type="button"
                onClick={() => adicionarAoCarrinho(produto)}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Produtos;