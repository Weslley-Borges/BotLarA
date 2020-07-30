const execute = (LarA, message) => {
    var conteudo = message.content
    let mensagem = message.join(" ")
    var charNumber = 0
    var charUPPER = 0
    var encurtador = false
    var UPPERMessage = false

    //Verifica o conteúdo presente na mensagem
    if(conteudo.includes("ad.fly") || conteudo.includes("bit.ly"))encurtador = true

    mensagem.split('').forEach( letra => {
        if (!isNaN(letra * 1)){charNumber ++
        }else if (letra == letra.toUpperCase())charUPPER ++ 
    })
    if(charUPPER >= (50/100)*(mensagem.length - charNumber))UPPERMessage = true

    //Adiciona esses resultados em um array
    let crimes = [encurtador, UPPERMessage]
    
    //Vai criar um aviso para o usuário, que só será enviado
    //se algum dos valores forem verdadeiros

    var aviso = `Olá, eu percebi que você teve alguns comportamentos que não são aceitos na comunidade:\n`
    var soluções = `O que você poderia fazer:\n`

    for(crime in crimes){
        if(!UPPERMessage && !encurtador){
            return
        }else{
            if(UPPERMessage){
                msg = `-Você utilizou demais o Capslock, isso pode irritar alguns membros\n`
                if(antiRepeat(aviso,msg))aviso += msg
                msg = `-Utilizar menos Capslock, eles não podem ser mais que 50% dos caracteres\n`
                if(antiRepeat(soluções,msg))soluções += msg
            }
            if (encurtador){
                msg = `-Você enviou links possuindo encurtadores, esses links podem afetar o dispositivo dos usários, implantando malwares\n`
                if(antiRepeat(aviso,msg))aviso += msg
                msg = `-Não enviar nenhum encurtador, se possível, envie o link inteiro\n`
                if(antiRepeat(soluções,msg))soluções += msg
            }
            message.author.send(aviso+soluções)
        }
    }
}
//Vai verificar se ma frase já existe na mensagem
//para evitar que a frase se repita
function antiRepeat(mensagem,frase){
    if(!mensagem.includes(frase)){
        return true
    }
    console.log("erro")
}

module.exports = {name: "moderate", execute}