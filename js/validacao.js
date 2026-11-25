const formContato = document.getElementById("form-contato");
const retornoContato = document.getElementById("retorno-contato");

if (formContato && retornoContato) {
    formContato.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nome = document.getElementById("nome-contato").value.trim();
        const email = document.getElementById("email-contato").value.trim();
        const assunto = document.getElementById("assunto-contato").value.trim();
        const mensagem = document.getElementById("mensagem-contato").value.trim();

        if (!nome || !email || !assunto || !mensagem) {
            retornoContato.textContent = "Preencha todos os campos antes de enviar.";
            return;
        }

        retornoContato.textContent = `Mensagem enviada, ${nome}. Recebemos seu contato sobre "${assunto}".`;
        formContato.reset();
    });
}