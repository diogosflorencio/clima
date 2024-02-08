const input = document.getElementById("input");
const botaoPesquisar = document.getElementById("botao-pesquisar");
const telaConteudo = document.querySelector(".tela-conteudo")
const telaIncial = document.querySelector(".tela-inicial")
const container = document.querySelector(".container")
const localizacao = document.querySelector(".localizacao")

botaoPesquisar.onclick = () =>{
    pesquisaCidade(input.value);
    mudaTela();
}
input.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        pesquisaCidade(input.value);
    }
})

const buscaInfos = (param1, param2) => {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${param1}&lon=${param2}&appid=e9d7d8e62d3d6b589222dfdc4648be38`;
    fetch(endpoint)
    .then(dados => dados.json())
    //.then(dados => telaConteudo.innerHTML = dados.name)
    .then(dados => {
        console.log(dados)
        const cidade = document.createElement("p");
        cidade.innerHTML = dados.name
        localizacao.appendChild(cidade);

        const data = document.createElement("p");
        const d = new Date();
        const dias = [
            'Dom',
            'Seg',
            'Ter',
            'Qua',
            'Qui',
            'Sex',
            'Sáb'
        ]
        const meses = [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
          ]
        data.innerHTML = `${dias[d.getDay()]}, ${d.getDay()} ${meses[d.getMonth()]}`
        localizacao.appendChild(data);

    })
}

const pesquisaCidade = (param) => {
    const endpoint2 = `https://api.openweathermap.org/geo/1.0/direct?q=${param}&appid=e9d7d8e62d3d6b589222dfdc4648be38`
    fetch(endpoint2)
    .then(dados => dados.json())
    .then(dados => {
        buscaInfos(dados[0].lat, dados[0].lon);
    })
}

const tamanhoTela = window.matchMedia("(max-width: 600px)");

const mudaTela = () => {
    if(tamanhoTela.matches){
        telaConteudo.style.position = "absolute";
        telaIncial.style.display = "none";
    }
}

//muda backgroud de acordo com o periodo do dia

let hora = new Date().getHours()

if(hora >= 6 && hora < 18){
    container.classList.add("dia");
}else{
    container.classList.add("noite");
}
