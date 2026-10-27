
import api from "../services/api";
import { useCallback, useEffect, useState } from "react";

function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [volumeMl, setVolumeMl] = useState("");
  const [produtoEditando, setProdutoEditando] = useState(null);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [excluindoId, setExcluindoId] = useState(null);
  const [erro, setErro] = useState("");

  const carregarProdutos = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await api.get("/produtos");
      setProdutos(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
      setErro(
        erro.response?.data?.mensagem ||
          erro.response?.data?.erro ||
          "Não foi possível carregar os produtos. Verifique a conexão e tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  function mensagemErro(erro, operacao) {
    return (
      erro.response?.data?.mensagem ||
      erro.response?.data?.erro ||
      erro.message ||
      `Não foi possível ${operacao}. Tente novamente.`
    );
  }

  async function cadastrarProduto(event) {
    event.preventDefault();
    if (salvando) return;

    setSalvando(true);
    setErro("");

    try {
      await api.post("/produtos", {
        nome,
        descricao,
        preco: Number(preco),
        estoque: Number(estoque),
        volumeMl: volumeMl ? Number(volumeMl) : null,
      });

      limparFormulario();
      await carregarProdutos();
      alert("Produto cadastrado com sucesso!");
    } catch (erro) {
      console.error("Erro ao cadastrar produto:", erro);
      setErro(mensagemErro(erro, "cadastrar o produto"));
    } finally {
      setSalvando(false);
    }
  }

  function prepararEdicao(produto) {
    setProdutoEditando(produto);
    setNome(produto.nome || "");
    setDescricao(produto.descricao || "");
    setPreco(produto.preco ?? "");
    setEstoque(produto.estoque ?? "");
    setVolumeMl(produto.volumeMl ?? "");
    setErro("");
  }

  async function atualizarProduto(event) {
    event.preventDefault();
    if (salvando || !produtoEditando) return;

    setSalvando(true);
    setErro("");

    try {
      await api.put(`/produtos/${produtoEditando.id}`, {
        nome,
        descricao,
        preco: Number(preco),
        estoque: Number(estoque),
        volumeMl: volumeMl ? Number(volumeMl) : null,
      });

      limparFormulario();
      await carregarProdutos();
      alert("Produto atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro ao atualizar produto:", erro);
      setErro(mensagemErro(erro, "atualizar o produto"));
    } finally {
      setSalvando(false);
    }
  }

  async function excluirProduto(id) {
    if (excluindoId !== null) return;

    const confirmar = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmar) return;

    setExcluindoId(id);
    setErro("");

    try {
      await api.delete(`/produtos/${id}`);
      await carregarProdutos();
      alert("Produto excluído com sucesso!");
    } catch (erro) {
      console.error("Erro ao excluir produto:", erro);
      setErro(mensagemErro(erro, "excluir o produto"));
    } finally {
      setExcluindoId(null);
    }
  }

  function limparFormulario() {
    setNome("");
    setDescricao("");
    setPreco("");
    setEstoque("");
    setVolumeMl("");
    setProdutoEditando(null);
    setErro("");
  }

  const produtosAtivos = produtos.filter(
    (produto) => produto.ativo
  ).length;

  const estoqueTotal = produtos.reduce(
    (total, produto) => total + Number(produto.estoque || 0),
    0
  );

  const ordem = {
    "Cajuína Tradicional": 1,
    "Cajuína Premium": 2,
    "Cajuína Especial": 3,
  };

  const produtosOrdenados = [...produtos].sort(
    (a, b) =>
      (ordem[a.nome?.trim()] ?? 99) -
      (ordem[b.nome?.trim()] ?? 99)
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

          {erro && (
            <div className="produtos-erro" role="alert">
              <p>{erro}</p>
              <button
                type="button"
                onClick={carregarProdutos}
                disabled={carregando}
              >
                {carregando ? "Carregando..." : "Tentar novamente"}
              </button>
            </div>
          )}

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
                onChange={(event) => setDescricao(event.target.value)}
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
                onChange={(event) => setEstoque(event.target.value)}
                required
              />

              <input
                type="number"
                placeholder="Volume em ml"
                value={volumeMl}
                onChange={(event) => setVolumeMl(event.target.value)}
              />

              <button type="submit" disabled={salvando}>
                {salvando
                  ? "Salvando..."
                  : produtoEditando
                    ? "Atualizar produto"
                    : "Cadastrar produto"}
              </button>

              {produtoEditando && (
                <button
                  type="button"
                  onClick={limparFormulario}
                  disabled={salvando}
                >
                  Cancelar edição
                </button>
              )}
            </form>
          </div>

          <div className="admin-lista">
            <h2>Produtos cadastrados</h2>

            {carregando ? (
              <p role="status">Carregando produtos...</p>
            ) : (
              produtosOrdenados.map((produto) => (
                <div className="admin-produto" key={produto.id}>
                  <h3>{produto.nome}</h3>

                  <p>
                    Preço: R${" "}
                    {Number(produto.preco)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>

                  <p>Estoque: {produto.estoque}</p>

                  <button
                    type="button"
                    onClick={() => {
                      setErro("");
                      prepararEdicao(produto);
                    }}
                    disabled={false}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => excluirProduto(produto.id)}
                    disabled={excluindoId !== null || salvando}
                  >
                    {excluindoId === produto.id
                      ? "Excluindo..."
                      : "Excluir"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Admin;
