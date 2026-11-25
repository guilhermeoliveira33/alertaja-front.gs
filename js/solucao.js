const pontosBairros = [
    {
        bairro: "Penha",
        local: "Rua Exemplo A — Região da Penha",
        nivel: "MODERADO",
        agua: "28 cm",
        orientacao: "Evite trechos com lâmina d'água acumulada e acompanhe rotas alternativas."
    },
    {
        bairro: "Tatuapé",
        local: "Avenida Exemplo B — Região do Tatuapé",
        nivel: "BAIXO",
        agua: "12 cm",
        orientacao: "Atenção ao transitar em pontos com escoamento mais lento durante chuva."
    },
    {
        bairro: "Itaquera",
        local: "Rua Exemplo C — Região de Itaquera",
        nivel: "ALTO",
        agua: "65 cm",
        orientacao: "Risco elevado: não atravesse a pé ou de veículo; procure local seguro e a Defesa Civil."
    }
];

function renderizarBairros(filtroTexto = "") {
    const lista = document.getElementById("lista-bairros");
    if (!lista) return;

    const termo = filtroTexto.trim().toLowerCase();
    const filtrados = pontosBairros.filter((item) => {
        if (!termo || termo === "todos") return true;
        return item.bairro.toLowerCase().includes(termo) || item.local.toLowerCase().includes(termo);
    });

    lista.innerHTML = "";

    if (filtrados.length === 0) {
        const aviso = document.createElement("p");
        aviso.className = "aviso";
        aviso.textContent = "Nenhum ponto simulado encontrado para esse filtro. Teste Penha, Tatuapé ou Itaquera.";
        lista.appendChild(aviso);
        return;
    }

    filtrados.forEach((ponto) => {
        const cartao = document.createElement("article");
        cartao.className = "cartao";

        const titulo = document.createElement("h3");
        titulo.textContent = `${ponto.bairro} — Nível ${ponto.nivel} (${ponto.agua})`;

        const local = document.createElement("p");
        local.textContent = `Ponto simulado: ${ponto.local}`;

        const orientacao = document.createElement("p");
        orientacao.textContent = `Orientação: ${ponto.orientacao}`;

        cartao.appendChild(titulo);
        cartao.appendChild(local);
        cartao.appendChild(orientacao);
        lista.appendChild(cartao);
    });
}

function classificarNivelAgua(cm) {
    if (cm < 20) return "BAIXO";
    if (cm < 50) return "MODERADO";
    return "ALTO";
}

function orientacaoPorNivel(nivel) {
    if (nivel === "BAIXO") {
        return "Atenção redobrada ao passar pela via e observe a evolução da chuva.";
    }
    if (nivel === "MODERADO") {
        return "Evite áreas com acúmulo de água ou correnteza e busque vias mais altas.";
    }
    return "Risco elevado: não atravesse a pé ou de veículo, procure abrigo seguro e siga a Defesa Civil.";
}

function configurarMapa() {
    const campoBusca = document.getElementById("filtro-bairro");
    const botoesBairro = document.querySelectorAll(".btn-bairro");

    if (campoBusca) {
        campoBusca.addEventListener("input", () => {
            renderizarBairros(campoBusca.value);
        });
    }

    botoesBairro.forEach((botao) => {
        botao.addEventListener("click", () => {
            const bairroSelecionado = botao.dataset.bairro || "";
            if (campoBusca) {
                campoBusca.value = bairroSelecionado === "Todos" ? "" : bairroSelecionado;
            }
            renderizarBairros(bairroSelecionado);
        });
    });

    renderizarBairros();
}

function configurarOcorrencias() {
    const form = document.getElementById("form-ocorrencia");
    const lista = document.getElementById("lista-ocorrencias");
    if (!form || !lista) return;

    const inputTipo = document.getElementById("tipo");
    const inputBairro = document.getElementById("bairro");
    const inputDescricao = document.getElementById("descricao");
    const semOcorrencias = document.getElementById("sem-ocorrencias");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const tipo = inputTipo ? inputTipo.value.trim() : "";
        const bairro = inputBairro ? inputBairro.value.trim() : "";
        const descricao = inputDescricao ? inputDescricao.value.trim() : "";

        if (!tipo || !bairro || !descricao) return;

        if (semOcorrencias) {
            semOcorrencias.style.display = "none";
        }

        const cartao = document.createElement("article");
        cartao.className = "cartao risco-alto";

        const etiqueta = document.createElement("span");
        etiqueta.className = "etiqueta-risco etiqueta-alto";
        etiqueta.textContent = "Risco alto";

        const titulo = document.createElement("h3");
        titulo.textContent = `${tipo} — ${bairro}`;

        const pDesc = document.createElement("p");
        pDesc.textContent = `Relato: ${descricao}`;

        const pOrient = document.createElement("p");
        pOrient.textContent = `Orientação: ${orientacaoPorNivel("ALTO")}`;

        cartao.appendChild(etiqueta);
        cartao.appendChild(titulo);
        cartao.appendChild(pDesc);
        cartao.appendChild(pOrient);
        lista.prepend(cartao);

        form.reset();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    configurarMapa();
    configurarOcorrencias();
});