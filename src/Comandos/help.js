const execute = (bot, message, args) => {
    let msg = "\n**----- AJUDA -----**\n\n"
    args = args.shift()

    if(args != ''){
        bot.commands.forEach( command => {
            if(command.help){
                msg += `__**${command.name}**__: ${command.help}\n\n`
            }
        })
    }
    return message.channel.send(msg)
}
module.exports = {
    name: "help",
    help: "Mostra todos os comandos e seus usos",
    execute
}
