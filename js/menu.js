document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btn-menu");
    const menuNav = document.getElementById("menu-principal") || document.querySelector("nav");

    if (btnMenu && menuNav) {
        btnMenu.addEventListener("click", () => {
            const estaAberto = menuNav.classList.toggle("aberto");
            btnMenu.setAttribute("aria-expanded", estaAberto ? "true" : "false");
        });
    }

    const formulario = document.querySelector("main form");
    if (!formulario) return;

    const avisoExistente = document.getElementById("retorno-contato");
    let caixaAviso = avisoExistente;

    if (!caixaAviso) {
        caixaAviso = document.createElement("p");
        caixaAviso.className = "aviso";
        formulario.insertAdjacentElement("afterend", caixaAviso);
    }

    caixaAviso.setAttribute("role", "status");
    caixaAviso.setAttribute("aria-live", "polite");
    caixaAviso.style.display = "none";

    const listaOcorrencias = document.getElementById("lista-ocorrencias");
    const semOcorrencias = document.getElementById("sem-ocorrencias");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const campos = Array.from(formulario.querySelectorAll("input, textarea, select"));
        const algumVazio = campos.some((campo) => campo.value.trim().length === 0);

        if (algumVazio) {
            caixaAviso.textContent = "Preencha todos os campos obrigatórios para continuar.";
            caixaAviso.style.display = "block";
            return;
        }

        const valores = campos.map((campo) => campo.value.trim());
        const primeiroValor = valores[0];
        const segundoValor = valores[1] || "";
        const terceiroValor = valores[2] || "";

        if (document.body.classList.contains("pagina-contato")) {
            caixaAviso.textContent = `Mensagem enviada por ${primeiroValor}.`;
        } else {
            caixaAviso.textContent = segundoValor
                ? `Ocorrência registrada: ${primeiroValor} — ${segundoValor}.`
                : `Ocorrência registrada: ${primeiroValor}.`;

            if (listaOcorrencias) {
                if (semOcorrencias) {
                    semOcorrencias.style.display = "none";
                }

                const card = document.createElement("div");
                card.className = "cartao risco-alto";

                const etiqueta = document.createElement("span");
                etiqueta.className = "etiqueta-risco etiqueta-alto";
                etiqueta.textContent = "Risco alto";

                const titulo = document.createElement("p");
                const forte = document.createElement("strong");
                forte.textContent = segundoValor
                    ? `${primeiroValor} — ${segundoValor}`
                    : primeiroValor;
                titulo.appendChild(forte);

                card.appendChild(etiqueta);
                card.appendChild(titulo);

                if (terceiroValor) {
                    const desc = document.createElement("p");
                    desc.textContent = terceiroValor;
                    card.appendChild(desc);
                }

                listaOcorrencias.prepend(card);
            }
        }

        caixaAviso.style.display = "block";
        formulario.reset();
    });
});
