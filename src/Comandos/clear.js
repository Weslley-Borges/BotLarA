const execute = (bot, message, args) => {
    const adminRole = message.guild.roles.cache.find((r) => r.name == "Moderadores")

    if(message.member.roles.cache.has(adminRole.id)){
        message.channel.messages.fetch({ limit: 10 }).then(messages => { // Fetches the messages
            message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
        )});
    }else{message.reply("Você precisa ser um moderador para usar esse comando")}
}
module.exports = {
    name: "clear",
    help: "Exclui as 100 últimas mensagens de um canal",
    execute
}
