import { useEffect, useState } from "react";

function Admin() {
  const [produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [volumeMl, setVolumeMl] = useState("");

  const [produtoEditando, setProdutoEditando] = useState(null);
    useEffect(() => {
    carregarProdutos();
  }, []);

  function carregarProdutos() {
    fetch("http://localhost:3000/produtos")
      .then((res) => res.json())
      .then((dados) => setProdutos(dados))
      .catch((erro) =>
        console.error("Erro ao buscar produtos:", erro)
      );
  }

  async function cadastrarProduto(event) {
    event.preventDefault();

    const resposta = await fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        descricao,
        preco: Number(preco),
        estoque: Number(estoque),
        volumeMl: volumeMl ? Number(volumeMl) : null,
      }),
    });

    if (!resposta.ok) {
      alert("Não foi possível cadastrar o produto.");
      return;
    }

    alert("Produto cadastrado com sucesso!");

    limparFormulario();
    carregarProdutos();
  }

  function prepararEdicao(produto) {
    setProdutoEditando(produto);
    setNome(produto.nome || "");
    setDescricao(produto.descricao || "");
    setPreco(produto.preco || "");
    setEstoque(produto.estoque || "");
    setVolumeMl(produto.volumeMl || "");
  }

  async function atualizarProduto(event) {
    event.preventDefault();

    const resposta = await fetch(
      `http://localhost:3000/produtos/${produtoEditando.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          descricao,
          preco: Number(preco),
          estoque: Number(estoque),
          volumeMl: volumeMl ? Number(volumeMl) : null,
        }),
      }
    );

    if (!resposta.ok) {
      alert("Não foi possível atualizar o produto.");
      return;
    }

    alert("Produto atualizado com sucesso!");
    limparFormulario();
    carregarProdutos();
  }

  async function excluirProduto(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmar) {
      return;
    }

    const resposta = await fetch(
      `http://localhost:3000/produtos/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!resposta.ok) {
      alert("Não foi possível excluir o produto.");
      return;
    }

    alert("Produto excluído com sucesso!");

    carregarProdutos();
  }

  function limparFormulario() {
    setNome("");
    setDescricao("");
    setPreco("");
    setEstoque("");
    setVolumeMl("");
    setProdutoEditando(null);
  }

  const produtosAtivos = produtos.filter(
    (produto) => produto.ativo
  ).length;

  const estoqueTotal = produtos.reduce(
    (total, produto) => total + Number(produto.estoque || 0),
    0
  );

   
  return (
    <main>
      <section className="admin">
        <div className="admin-container">
          <h1 className="auth-title">Painel Administrativo</h1>

          <p className="admin-intro">
            Área de gerenciamento da SMT Cajuína Puro Sabor.
          </p>

          <div className="admin-conteudo">
            <div className="admin-card">
              <h2>Produtos</h2>
              <p>Total de produtos: {produtos.length}</p>
            </div>

            <div className="admin-card">
              <h2>Produtos ativos</h2>
              <p>{produtosAtivos}</p>
            </div>

            <div className="admin-card">
              <h2>Estoque</h2>
              <p>{estoqueTotal} unidades</p>
            </div>
          </div>

          <div className="admin-gerenciamento">
            <h2>
              {produtoEditando
                ? "Atualizar produto"
                : "Cadastrar produto"}
            </h2>

            <form
              onSubmit={
                produtoEditando
                  ? atualizarProduto
                  : cadastrarProduto
              }
            >
              <input
                type="text"
                placeholder="Nome do produto"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(event) =>
                  setDescricao(event.target.value)
                }
              />

              <input
                type="number"
                step="0.01"
                placeholder="Preço"
                value={preco}
                onChange={(event) => setPreco(event.target.value)}
                required
              />

              <input
                type="number"
                placeholder="Estoque"
                value={estoque}
                onChange={(event) =>
                  setEstoque(event.target.value)
                }
                required
              />

              <input
                type="number"
                placeholder="Volume em ml"
                value={volumeMl}
                onChange={(event) =>
                  setVolumeMl(event.target.value)
                }
              />

              <button type="submit">
                {produtoEditando
                  ? "Atualizar produto"
                  : "Cadastrar produto"}
              </button>

              {produtoEditando && (
                <button
                  type="button"
                  onClick={limparFormulario}
                >
                  Cancelar edição
                </button>
              )}
            </form>
          </div>

          <div className="admin-lista">
            <h2>Produtos cadastrados</h2>

            {produtos.map((produto) => (
              <div
                className="admin-produto"
                key={produto.id}
              >
                <h3>{produto.nome}</h3>

                <p>
                  Preço: R${" "}
                  {Number(produto.preco)
                    .toFixed(2)
                    .replace(".", ",")}
                </p>

                <p>
                  Estoque: {produto.estoque}
                </p>

                <button
                  type="button"
                  onClick={() => prepararEdicao(produto)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => excluirProduto(produto.id)}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Admin;