import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!email.includes("@")) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setErro("");
    try {
  const resposta = await fetch("http://127.0.0.1:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senha,
    }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    setErro(dados.mensagem || "E-mail ou senha inválidos.");
    return;
  }

  localStorage.setItem("token", dados.token);
  localStorage.setItem("usuario", JSON.stringify(dados.usuario));

  console.log("Login realizado com sucesso:", dados);
window.location.href = "/";} catch (error) {
  setErro("Não foi possível conectar à API.");
}
  }

  return (
    <main>
      <section className="login">
        <div className="login-container">
          <h1 className="auth-title">Login</h1>

          <p>Acesse sua conta na SMT Cajuína Puro Sabor.</p>

          <form onSubmit={handleSubmit}>
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

            <button type="submit">Entrar</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;