import { useEffect, useState } from "react";

function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    function carregarCarrinho() {
      const dados = JSON.parse(
        localStorage.getItem("carrinho") || "[]"
      );

      setCarrinho(dados);
    }

    carregarCarrinho();

    const intervalo = setInterval(carregarCarrinho, 500);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  function atualizarQuantidade(id, novaQuantidade) {
    if (novaQuantidade < 1) {
      removerDoCarrinho(id);
      return;
    }

    const novoCarrinho = carrinho.map((produto) =>
      produto.id === id
        ? { ...produto, quantidade: novaQuantidade }
        : produto
    );

    setCarrinho(novoCarrinho);

    localStorage.setItem(
      "carrinho",
      JSON.stringify(novoCarrinho)
    );
  }

  function removerDoCarrinho(id) {
    const novoCarrinho = carrinho.filter(
      (produto) => produto.id !== id
    );

    setCarrinho(novoCarrinho);

    localStorage.setItem(
      "carrinho",
      JSON.stringify(novoCarrinho)
    );
  }

  const total = carrinho.reduce(
    (soma, produto) =>
      soma + Number(produto.preco) * produto.quantidade,
    0
  );

  return (
    <main>
      <section className="carrinho">
        <div className="carrinho-container">
          <h1 className="auth-title">Carrinho de compras</h1>

          <p className="carrinho-intro">
            Confira os produtos selecionados antes de finalizar sua compra.
          </p>

          <div className="carrinho-conteudo">
            {carrinho.length === 0 ? (
              <div className="carrinho-vazio">
                <h2>Seu carrinho está vazio</h2>

                <p>
                  Adicione produtos para visualizar os itens,
                  quantidades e valores da sua compra.
                </p>
              </div>
            ) : (
              <div>
                {carrinho.map((produto) => (
                  <div key={produto.id}>
                    <h2>{produto.nome}</h2>

                    <p>
                      Preço unitário: R${" "}
                      {Number(produto.preco)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>

                    <p>
                      Quantidade: {produto.quantidade}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        atualizarQuantidade(
                          produto.id,
                          produto.quantidade - 1
                        )
                      }
                    >
                      −
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        atualizarQuantidade(
                          produto.id,
                          produto.quantidade + 1
                        )
                      }
                    >
                      +
                    </button>

                    <p>
                      Subtotal: R${" "}
                      {(
                        Number(produto.preco) *
                        produto.quantidade
                      )
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>

                    <button
                      type="button"
                      onClick={() => removerDoCarrinho(produto.id)}
                    >
                      Remover
                    </button>
                  </div>
                ))}

                <h2>
                  Total da compra: R${" "}
                  {total.toFixed(2).replace(".", ",")}
                </h2>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Carrinho;