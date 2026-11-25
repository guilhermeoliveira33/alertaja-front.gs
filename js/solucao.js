document.addEventListener("DOMContentLoaded", function () {
    const listaBairros = document.getElementById("lista-bairros");
    const campoBusca = document.getElementById("filtro-bairro");
    const botoesBairro = document.querySelectorAll(".btn-bairro");

    if (!listaBairros) {
        return;
    }

    const bairros = [
        {
            nome: "Penha",
            risco: "Alto",
            classeRisco: "risco-alto",
            classeEtiqueta: "etiqueta-alto",
            descricao: "Pontos sujeitos a acúmulo de água em chuvas intensas. Atenção em vias próximas a córregos."
        },
        {
            nome: "Tatuapé",
            risco: "Médio",
            classeRisco: "risco-medio",
            classeEtiqueta: "etiqueta-medio",
            descricao: "Trechos com retenção temporária em pancadas fortes. Acompanhe os avisos locais."
        },
        {
            nome: "Itaquera",
            risco: "Baixo",
            classeRisco: "risco-baixo",
            classeEtiqueta: "etiqueta-baixo",
            descricao: "Condição mais estável na maior parte do bairro, com atenção pontual em áreas baixas."
        }
    ];

    function mostrarBairros(filtroTexto) {
        const termo = (filtroTexto || "").trim().toLowerCase();
        listaBairros.innerHTML = "";

        let encontrou = 0;

        for (let i = 0; i < bairros.length; i++) {
            const bairro = bairros[i];
            const nomeMinusculo = bairro.nome.toLowerCase();

            if (termo === "" || termo === "todos" || nomeMinusculo.indexOf(termo) !== -1) {
                encontrou++;

                const card = document.createElement("div");
                card.className = "cartao " + bairro.classeRisco;

                const titulo = document.createElement("h3");
                titulo.textContent = bairro.nome;

                const etiqueta = document.createElement("span");
                etiqueta.className = "etiqueta-risco " + bairro.classeEtiqueta;
                etiqueta.textContent = "Risco " + bairro.risco;

                const texto = document.createElement("p");
                texto.textContent = bairro.descricao;

                card.appendChild(titulo);
                card.appendChild(etiqueta);
                card.appendChild(texto);

                listaBairros.appendChild(card);
            }
        }

        if (encontrou === 0) {
            const vazio = document.createElement("p");
            vazio.textContent = "Nenhum bairro encontrado para esse filtro.";
            listaBairros.appendChild(vazio);
        }
    }

    mostrarBairros("");

    for (let i = 0; i < botoesBairro.length; i++) {
        botoesBairro[i].addEventListener("click", function () {
            const bairroClicado = this.getAttribute("data-bairro") || "";
            if (campoBusca) {
                campoBusca.value = bairroClicado === "Todos" ? "" : bairroClicado;
            }
            mostrarBairros(bairroClicado);
        });
    }

    if (campoBusca) {
        campoBusca.addEventListener("input", function () {
            mostrarBairros(campoBusca.value);
        });
    }
});