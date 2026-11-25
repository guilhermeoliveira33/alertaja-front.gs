document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btn-menu");
    const menuNav = document.querySelector("nav");

    if (btnMenu && menuNav) {
        btnMenu.addEventListener("click", () => {
            menuNav.classList.toggle("aberto");
            const aberto = menuNav.classList.contains("aberto");
            btnMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
        });
    }

    const formulario = document.querySelector("main form");
    if (!formulario) return;

    const caixaAviso = document.createElement("p");
    caixaAviso.className = "aviso";
    caixaAviso.setAttribute("role", "status");
    caixaAviso.setAttribute("aria-live", "polite");
    caixaAviso.style.display = "none";
    formulario.insertAdjacentElement("afterend", caixaAviso);

    const listaOcorrencias = document.getElementById("lista-ocorrencias");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const campos = Array.from(formulario.querySelectorAll("input, textarea, select"));
        const preenchidos = campos
            .map((campo) => campo.value.trim())
            .filter((valor) => valor.length > 0);

        if (preenchidos.length === 0) {
            caixaAviso.textContent = "Preencha os campos para continuar.";
            caixaAviso.style.display = "block";
            return;
        }

        const primeiroValor = preenchidos[0];
        const segundoValor = preenchidos[1] || "";
        const terceiroValor = preenchidos[2] || "";

        if (document.body.classList.contains("pagina-contato")) {
            caixaAviso.textContent = `Mensagem enviada por ${primeiroValor}.`;
        } else {
            caixaAviso.textContent = segundoValor
                ? `Ocorrência registrada: ${primeiroValor} — ${segundoValor}.`
                : `Ocorrência registrada: ${primeiroValor}.`;

            if (listaOcorrencias) {
                const card = document.createElement("div");
                card.className = "cartao risco-alto";
                card.innerHTML = `
                    <span class="etiqueta-risco etiqueta-alto">Risco alto</span>
                    <p><strong>${primeiroValor}${segundoValor ? " — " + segundoValor : ""}</strong></p>
                    ${terceiroValor ? `<p>${terceiroValor}</p>` : ""}
                `;
                listaOcorrencias.prepend(card);
            }
        }

        caixaAviso.style.display = "block";
        formulario.reset();
    });
});