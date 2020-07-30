const execute = (LarA, message, args) => {
    let msg = "\n**|=|=|= AJUDA =|=|=|**\n\n"
    LarA.commands.forEach( command => {
        if(command.help){
            msg += `__**${command.name}**__: ${command.help}\n`
        }
    })

    return message.channel.send(msg)
}
module.exports = {
    name: "help",
    execute
}
