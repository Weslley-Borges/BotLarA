const Regras = require("./regras").execute
const execute = (LarA, message) => {
    var conteudo = message.content
    let mensagem = message.content
    var charUPPER = 0
    var encurtador = false
    var UPPERMessage = false

    if(conteudo.includes("ad.fly") || conteudo.includes("bit.ly"))encurtador = true
    mensagem.split('').forEach( letra => {
        if (!isNaN(letra * 1)){
        }else if (letra == letra.toUpperCase()) {
            charUPPER ++
        }
    })
    if(charUPPER >= (50/100)*mensagem.length){
        UPPERMessage = true
    }
    let crimes = [encurtador, UPPERMessage]
    Regras(LarA, message, crimes)
}

module.exports = {name: "moderate", execute}