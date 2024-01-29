
const endpoint = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=e9d7d8e62d3d6b589222dfdc4648be38"

fetch(endpoint)
.then(dados => dados.json())
.then(dados => console.log(dados))