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
        aviso.textContent = "Nenhum ponto ilustrativo encontrado para esse filtro. Teste Penha, Tatuapé ou Itaquera.";
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
    if (!form) return;

    const inputBairro = document.getElementById("bairro-ocorrencia");
    const inputRua = document.getElementById("rua-ocorrencia");
    const inputNivel = document.getElementById("nivel-agua");
    const inputDescricao = document.getElementById("descricao-ocorrencia");
    const mensagem = document.getElementById("mensagem-ocorrencia");
    const resultado = document.getElementById("resultado-ocorrencia");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const bairro = inputBairro.value.trim();
        const rua = inputRua.value.trim();
        const nivelValor = Number(inputNivel.value);
        const descricao = inputDescricao.value.trim();

        if (!bairro || !rua || !descricao || inputNivel.value.trim() === "") {
            mensagem.textContent = "Preencha bairro, rua/referência, nível da água e descrição antes de gerar o relato.";
            return;
        }

        if (Number.isNaN(nivelValor) || nivelValor < 0 || nivelValor > 500) {
            mensagem.textContent = "Informe um nível de água válido entre 0 cm e 500 cm.";
            return;
        }

        const classificacao = classificarNivelAgua(nivelValor);
        const orientacao = orientacaoPorNivel(classificacao);

        mensagem.textContent = "Relato ilustrativo gerado na tela (protótipo sem envio externo e sem substituir a Defesa Civil).";
        resultado.innerHTML = "";

        const cartao = document.createElement("article");
        cartao.className = "cartao";

        const titulo = document.createElement("h3");
        titulo.textContent = `${bairro} — Classificação: ${classificacao} (${nivelValor} cm)`;

        const pRua = document.createElement("p");
        pRua.textContent = `Local: ${rua}`;

        const pDesc = document.createElement("p");
        pDesc.textContent = `Relato: ${descricao}`;

        const pOrient = document.createElement("p");
        pOrient.textContent = `Orientação: ${orientacao}`;

        cartao.appendChild(titulo);
        cartao.appendChild(pRua);
        cartao.appendChild(pDesc);
        cartao.appendChild(pOrient);
        resultado.appendChild(cartao);
    });
}

configurarMapa();
configurarOcorrencias();