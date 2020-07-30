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
    Aviso(LarA, message, crimes)
}
function Aviso(LarA, message, crimes){
    var aviso = `Olá, eu percebi que você teve alguns comportamentos que não são aceitados na comunidade\n`
    var soluções = `O que você poderia fazer:\n`
    for(crime in crimes){
        if(UPPERMessage){
            aviso += `-Você utilizou demais o Capslock, isso pode irritar alguns membros\n`
            soluções = `-Utilizar menos Capslock, eles não podem ser mais que 50% dos caracteres\n`
        }else if (encurtador){
            aviso += `-Você enviou links possuindo encurtadores, esses links podem afetar o dispositivo dos usários, implantando malwares\n`
            soluções = `-Não enviar nenhum encurtador, se possível, envie o link inteiro\n`
        }
    }
    message.author.send(aviso+soluções)
}

module.exports = {name: "moderate", execute}