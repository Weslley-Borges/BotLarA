const execute = (bot, message, args) => {
    let msg = "\n**----- AJUDA -----**\n\n"
    args = args.shift()

    if(args != ''){
        bot.commands.forEach( command => {
            if(command.help){
                msg += `__**${command.name}**__: ${command.help}\n\n`
            }
        })
    }else{
        //Caso haja um comando específico
        try{
            bot.commands.forEach( command => {
                if(command.args == args && command.help){
                    msg += `__**${command.name}**__: ${command.help}\n`
                }
            })
        }catch(e){
            bot.message.reply(`não existe nenhum comando chamado ${args}`)
            console.log(e)
        }
    }
    return message.channel.send(msg)
}
module.exports = {
    name: "help",
    help: "Mostra todos os comandos e seus usos",
    execute
}
