const input = document.getElementById("input");
const botaoPesquisar = document.getElementById("botao-pesquisar");
const telaConteudo = document.getElementsByClassName("tela-conteudo")[0]

botaoPesquisar.onclick = () =>{
    pesquisaCidade(input.value);
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
    .then(dados => telaConteudo.innerHTML = dados.name)
}

const pesquisaCidade = (param) => {
    const endpoint2 = `https://api.openweathermap.org/geo/1.0/direct?q=${param}&appid=e9d7d8e62d3d6b589222dfdc4648be38`
    fetch(endpoint2)
    .then(dados => dados.json())
    .then(dados => {
        buscaInfos(dados[0].lat, dados[0].lon);
    })
}