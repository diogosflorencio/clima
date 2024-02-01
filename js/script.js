
let lat = "30.489772"
let lon = -"99.771335"
const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={e9d7d8e62d3d6b589222dfdc4648be38}`

fetch(endpoint)
.then(dados => dados.json())
.then(dados => console.log(dados))