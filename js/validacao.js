document.addEventListener("DOMContentLoaded", () => {
    const formContato = document.getElementById("form-contato");
    const retornoContato = document.getElementById("retorno-contato");

    if (!formContato || !retornoContato) return;

    retornoContato.setAttribute("role", "status");
    retornoContato.setAttribute("aria-live", "polite");

    const emailValido = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

    formContato.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nomeInput = formContato.querySelector("#nome-contato, #nome, input[type='text']");
        const emailInput = formContato.querySelector("#email-contato, #email, input[type='email']");
        const assuntoInput = formContato.querySelector("#assunto-contato, #assunto");
        const mensagemInput = formContato.querySelector("#mensagem-contato, #mensagem, textarea");

        const nome = nomeInput ? nomeInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const assunto = assuntoInput ? assuntoInput.value.trim() : "";
        const mensagem = mensagemInput ? mensagemInput.value.trim() : "";

        if (!nome || !email || !assunto || !mensagem) {
            retornoContato.textContent = "Preencha todos os campos antes de enviar.";
            return;
        }

        if (!emailValido(email)) {
            retornoContato.textContent = "Digite um e-mail válido.";
            return;
        }

        retornoContato.textContent = "Mensagem enviada com sucesso.";
        formContato.reset();
    });
});