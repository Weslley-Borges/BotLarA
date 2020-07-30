const execute = (LarA,message,crimes) => {
    if(crimes.UPPERMessage == true){
        return message.author.send("Você está enviando mensagens irritantes, por favor, não faça mais isso.")
    }
}
module.exports = {
    execute
}