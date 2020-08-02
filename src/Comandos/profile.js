const execute = (bot, message, args) => {
    bot.message.reply(message.author)
    args = args.shift()

}
module.exports = {
    name: "profile",
    help: "Comandos do perfil do usuário",
    execute
}
