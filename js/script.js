const input = document.getElementById("input");
const botaoPesquisar = document.getElementById("botao-pesquisar");
const telaConteudo = document.querySelector(".tela-conteudo")
const telaIncial = document.querySelector(".tela-inicial")
const container = document.querySelector(".container")
const localizacao = document.querySelector(".localizacao")
const imagemTempo = document.getElementById("imagem-tempo");
const temperatura = document.querySelector(".temperatura");
const descricao = document.querySelector(".descricao");
const feels = document.querySelector(".feels-like");

botaoPesquisar.onclick = () =>{
    limpaTela();
    pesquisaCidade(input.value);
    mudaTela();
}
input.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        limpaTela();
        pesquisaCidade(input.value);
    }
})

const buscaInfos = (param1, param2) => {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${param1}&lon=${param2}&appid=e9d7d8e62d3d6b589222dfdc4648be38`;
    fetch(endpoint)
    .then(dados => dados.json())
    //.then(dados => telaConteudo.innerHTML = dados.name)
    .then(dados => {
        itensLocalizacao(dados);
        icones(dados);
        mostraTemperatura(dados);
        mostraDescricao(dados);
        mostraFeelsLike(dados);
    })
}

const limpaTela = () => {
    localizacao.innerHTML = "";
    imagemTempo.innerHTML = "";
    temperatura.innerHTML = "";
    feels.innerHTML = "";
    descricao.innerHTML = "";
}

const itensLocalizacao = (param) => {
    const imagemLocalizacao = document.createElement("img");
    imagemLocalizacao.classList = "icone-localizao";
    imagemLocalizacao.src = "img/icones-pesquisa/localizacao.png";
    localizacao.append(imagemLocalizacao);

    const cidade = document.createElement("p");
    cidade.classList = "cidade";
    cidade.innerHTML = param.name;
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
    data.classList = "data";
    localizacao.appendChild(data);
}

const icones = (param) => {
    const icone = document.createElement("img");
    icone.classList = "icone";
    if(param.weather[0].icon.slice(-1) == "n"){
        if(param.weather[0].id >= 801 && param.weather[0].id <= 804){
            icone.src = "img/nuvens-noite.png" 
        }
        else if(param.weather[0].id >= 200 && param.weather[0].id <= 232){
            icone.src = "img/tempestade-noite.png" 
        }
        else if(param.weather[0].id >= 600 && param.weather[0].id <= 800){
            icone.src = "img/lua.png" 
        }
        else if(param.weather[0].id >= 300 && param.weather[0].id <= 321 || param.weather[0].id >= 500 && param.weather[0].id <= 531){
            icone.src = "img/chuva-noite.png" 
        }
    }else{
        if(param.weather[0].id >= 801 && param.weather[0].id <= 804){
            icone.src = "img/nuvens-dia.png" 
        }
        else if(param.weather[0].id >= 200 && param.weather[0].id <= 232){
            icone.src = "img/tempestade-dia.png" 
        }
        else if(param.weather[0].id == 800){
            icone.src = "img/sol.png" 
        }
        else if(param.weather[0].id >= 300 && param.weather[0].id <= 321 || param.weather[0].id >= 500 && param.weather[0].id <= 531){
            icone.src = "img/chuva-dia.png" 
        }
    }
    
    imagemTempo.appendChild(icone);

}

const mostraTemperatura = (param) => {
    const temp = document.createElement("p");
    temp.classList = "temp";
    temp.innerText = `${Math.round(param.main.temp-273.15)}º`
    temperatura.appendChild(temp)
}

const mostraDescricao = (param) => {
    const descricaoClima = document.createElement("p");
    descricaoClima.innerHTML = param.weather[0].description;
    descricaoClima.classList = "item-descricao";
    descricao.appendChild(descricaoClima);
}

const mostraFeelsLike = (param) =>{
    const feelsLikeTemp = document.createElement("p");
    feelsLikeTemp.innerHTML =  `Sensação térmica: ${Math.round(param.main.feels_like-273.15)}º`;
    feelsLikeTemp.classList = "feels-like-temp"
    feels.appendChild(feelsLikeTemp);
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
        botaoReload();
    }
}
const botaoReload = () => {
    const imagemRealod = document.createElement("img");
    imagemRealod.classList = "imagem-reload"
    imagemRealod.src = "img/reload.png";
    const botao = document.createElement("button");
    botao.appendChild(imagemRealod);
    botao.classList = "botao-reload"
    telaConteudo.append(botao);
    botao.onclick = () => {
        location.reload();
    }
}

//muda backgroud de acordo com o periodo do dia

let hora = new Date().getHours()

if(hora >= 6 && hora < 18){
    container.classList.add("dia");
}else{
    container.classList.add("noite");
}
