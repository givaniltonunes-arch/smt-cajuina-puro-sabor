
import api from "../services/api";
import { useCallback, useEffect, useState } from "react";

function Produtos() {
  const produtosPadrao = [
    { nome: "Cajuína Tradicional", descricao: "Cajuína Puro Sabor", preco: "15" },
    { nome: "Cajuína Premium", descricao: "Cajuína Puro Sabor", preco: "18" },
    { nome: "Cajuína Especial", descricao: "Cajuína Puro Sabor", preco: "20" },
  ];

  const [produtosApi, setProdutosApi] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarProdutos = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await api.get("/produtos");
      setProdutosApi(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
      setProdutosApi([]);
      setErro(
        "Não foi possível carregar o catálogo atualizado. " +
        "Estamos exibindo os produtos padrão."
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  function adicionarAoCarrinho(produto) {
    const carrinhoAtual = JSON.parse(
      localStorage.getItem("carrinho") || "[]"
    );

    const produtoExistente = carrinhoAtual.find(
      (item) => item.nome === produto.nome
    );

    if (!produtoExistente) {
      carrinhoAtual.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
    alert(`${produto.nome} foi adicionado ao carrinho.`);
    window.dispatchEvent(new Event("carrinhoAtualizado"));
  }

  const listaProdutos = [
    ...(produtosApi.length > 0 ? produtosApi : produtosPadrao),
  ].sort((a, b) => {
    const ordem = {
      "Cajuína Tradicional": 1,
      "Cajuína Premium": 2,
      "Cajuína Especial": 3,
    };

    return (
      (ordem[a.nome?.trim()] ?? 99) -
      (ordem[b.nome?.trim()] ?? 99)
    );
  });

  return (
    <main>
      <section className="produtos-intro">
        <p>Conheça os produtos da SMT Cajuína Puro Sabor.</p>
      </section>

      {carregando && (
        <p className="produtos-status" role="status">
          Carregando produtos...
        </p>
      )}

      {!carregando && erro && (
        <div className="produtos-erro" role="alert">
          <p>{erro}</p>
          <button type="button" onClick={carregarProdutos}>
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && (
        <section className="produtos-lista">
          {listaProdutos.map((produto, index) => (
            <article
              className="produto-card"
              key={produto.id || index}
            >
                      <div className="produto-imagem">
          <img
            src={
              produto.nome === 'Cajuína Tradicional'
                ? '/imagens/cajuina-tradicional.png'
                : produto.nome === 'Cajuína Premium'
                  ? '/imagens/cajuina-premium.png'
                  : produto.nome === 'Cajuína Especial'
                    ? '/imagens/cajuina-especial.png'
                    : null
            }
            alt={produto.nome}
          />
        </div>

              <div className="produto-conteudo">
                <h2>{produto.nome}</h2>
                <p>{produto.descricao || "Cajuína Puro Sabor"}</p>
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
      )}
    </main>
  );
}

export default Produtos;
