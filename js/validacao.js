document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("main form");
    if (!form) {
        return;
    }

    let aviso = document.getElementById("retorno-contato");
    if (!aviso) {
        aviso = document.createElement("p");
        aviso.id = "retorno-contato";
        aviso.className = "aviso";
        form.insertAdjacentElement("afterend", aviso);
    }
    aviso.style.display = "none";

    const listaOcorrencias = document.getElementById("lista-ocorrencias");
    const semOcorrencias = document.getElementById("sem-ocorrencias");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const campos = form.querySelectorAll("input, textarea, select");
        const valores = [];

        for (let i = 0; i < campos.length; i++) {
            const tipo = campos[i].type;
            if (tipo === "submit" || tipo === "button" || tipo === "reset") {
                continue;
            }

            const valor = campos[i].value.trim();

            if (valor === "") {
                aviso.textContent = "Preencha todos os campos antes de enviar.";
                aviso.style.display = "block";
                campos[i].focus();
                return;
            }

            if (tipo === "email") {
                if (valor.indexOf("@") === -1 || valor.indexOf(".") === -1) {
                    aviso.textContent = "Digite um e-mail válido.";
                    aviso.style.display = "block";
                    campos[i].focus();
                    return;
                }
            }

            valores.push(valor);
        }

        const primeiro = valores[0] || "";
        const segundo = valores[1] || "";
        const terceiro = valores[2] || "";

        if (document.body.classList.contains("pagina-contato")) {
            aviso.textContent = "Mensagem enviada por " + primeiro + ".";
        } else {
            aviso.textContent = segundo
                ? "Ocorrência registrada: " + primeiro + " - " + segundo + "."
                : "Ocorrência registrada: " + primeiro + ".";

            if (listaOcorrencias) {
                if (semOcorrencias) {
                    semOcorrencias.style.display = "none";
                }

                const card = document.createElement("div");
                card.className = "cartao";

                const titulo = document.createElement("p");
                const forte = document.createElement("strong");
                forte.textContent = segundo ? primeiro + " - " + segundo : primeiro;
                titulo.appendChild(forte);
                card.appendChild(titulo);

                if (terceiro) {
                    const desc = document.createElement("p");
                    desc.textContent = terceiro;
                    card.appendChild(desc);
                }

                listaOcorrencias.prepend(card);
            }
        }

        aviso.style.display = "block";
        form.reset();
    });
});