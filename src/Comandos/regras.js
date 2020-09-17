const DBRegras = require("../databases/TBRegras")

const execute = (bot,message,args) => {
    const adminRole = message.guild.roles.cache.find((r) => r.name == "Moderadores")
    args = args.shift()

    if(args == "view"){
        DBRegras.viewAll(message)
    }else if(message.member.roles.cache.has(adminRole.id)){
        Camp = args.shift()

        if(args[0] == "create"){
            if(Camp != null){
                DBRegras.addRegra(Camp)
            }else{
                return bot.message.reply("você precisa dar um título para a regra")
            }

        }else if(args[0] == "delete"){
            if(Camp != null){
                DBRegras.deleteRegra(Camp)
            }else{
                return bot.message.reply("você precisa do título da regra para deletar")
            }
        }else if(args[0] == "update"){
            args = args.shift()
            Campos = ["Título","Descrição","Punições"]
            Campos.forEach( campo => {
                if (args[1] == campo){
                    DBRegras.updateRegra(args[0],args[1],)
                }
            })
        }
    }
}
module.exports = {
    name: 'law',
    help: "Comandos que visualizam e editam(caso seja moderador) as regras da comunidade",
    execute
}