import { useState } from "react";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setErro("");
    setMensagem("");

    if (!nome.trim()) {
      setErro("Digite um nome válido.");
      return;
    }

    if (!email || !email.includes("@")) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const resposta = await fetch("http://127.0.0.1:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.mensagem || "Não foi possível realizar o cadastro.");
        return;
      }

      setMensagem("Cadastro realizado com sucesso!");

      setNome("");
      setEmail("");
      setSenha("");

      console.log("Cadastro realizado com sucesso:", dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível conectar à API.");
    }
  }

  return (
    <main>
      <section className="login">
        <div className="login-container">
          <h1 className="auth-title">Cadastro</h1>

          <p>Crie sua conta na SMT Cajuína Puro Sabor.</p>

          <form onSubmit={handleSubmit}>
            <div className="login-campo">
              <label htmlFor="nome">Nome</label>

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Digite seu nome"
              />
            </div>

            <div className="login-campo">
              <label htmlFor="email">E-mail</label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="login-campo">
              <label htmlFor="senha">Senha</label>

              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                placeholder="Digite sua senha"
              />
            </div>

            {erro && <p className="login-erro">{erro}</p>}

            {mensagem && <p>{mensagem}</p>}

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Cadastro;