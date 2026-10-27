import api from "./api";

export async function listarProdutos() {
  try {
    const resposta = await api.get("/produtos");
    return resposta.data;
  } catch (erro) {
    const mensagem =
      erro.response?.data?.mensagem ||
      "Não foi possível carregar os produtos.";

    console.error(mensagem);
    throw erro;
  }
}