import { useState } from "react";

function Contato() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const contato = {
      nome: form.nome.value,
      email: form.email.value,
      mensagem: form.mensagem.value,
    };

    try {
      const resposta = await fetch("http://localhost:3000/contatos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contato),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.mensagem || "Não foi possível enviar a mensagem.");
      }

      setEnviado(true);
      form.reset();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section id="contato" className="contato">
      <h2>Entre em contato</h2>

      <p>
        Preencha o formulário abaixo para entrar em contato com a Cajuína Puro Sabor.
      </p>

      <form className="contato-form" onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite seu nome"
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu e-mail"
          required
        />

        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          placeholder="Digite sua mensagem"
          rows="5"
          required
        />

        <button type="submit">Enviar mensagem</button>

        {enviado && (
          <p className="contato-sucesso">
            Mensagem enviada com sucesso!
          </p>
        )}
      </form>
    </section>
  );
}

export default Contato;
