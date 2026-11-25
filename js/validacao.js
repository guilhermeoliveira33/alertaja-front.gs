function configurarContato() {
    const form = document.getElementById("form-contato");
    if (!form) return;

    const inputNome = document.getElementById("nome-contato");
    const inputEmail = document.getElementById("email-contato");
    const inputAssunto = document.getElementById("assunto-contato");
    const inputMensagem = document.getElementById("mensagem-contato");
    const retorno = document.getElementById("retorno-contato");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();
        const assunto = inputAssunto.value.trim();
        const mensagem = inputMensagem.value.trim();

        if (!nome || !email || !assunto || !mensagem) {
            retorno.textContent = "Preencha nome, e-mail, assunto e mensagem para testar o envio demonstrativo.";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            retorno.textContent = "Digite um endereço de e-mail válido no campo de contato.";
            return;
        }

        retorno.textContent = `Mensagem demonstrativa validada para ${nome} (${email}) sobre "${assunto}". Nenhum dado foi enviado a servidor externo.`;
        form.reset();
    });
}

configurarContato();