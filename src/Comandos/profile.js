const DB = require('../databases/TBUsers.js')

const execute = (bot, message, args) => {
    args = args.shift()

    if(args[0] == "edit"){
        editProfile(bot, message, args)
    }
    if(args == "all"){
        viewAll(bot,message,args)
    }else if(args == "createProfile"){
        NewProfile(bot,message,args)
    }
}



function NewProfile(bot,message,args){
    var IDD = message.author.discriminator
    if(DB.searchUser(IDD) != null){
        
    }else{
        DB.addUser(IDD)
    }
}
function viewAll(bot,message,args){
    var rows = DB.viewAll(false)
    for(r in rows){
        console.log(r)
    }
}


function editProfile(bot,message,args){
    const campos= "Nome, Email, Github, Bio, Linguagens"

    if(!args[1]){return bot.message.reply("Ops! Eu acho que você não colocou o campo desejado, tente esses:\n",campos)
    }else{
        try{
            var Edit = args.shift()
            ListCampos = ["Nome", "Email","Github", "Bio", "Linguagens"]

            ListCampos.forEach( campo => {
                if (args[1] == campo){
                    if(DB.searchUser(message.author.discriminator) != null){
                        DB.updateUser(message.author.discriminator,campo,Edit)
                    }
                    NewProfile(bot,message,args)
                }
            })

        }catch(e){
            console.log("Houve um erro:",e)
            return bot.message.reply("Houve um erro na execução")
        }
    }
}
module.exports = {
    name: "profile",
    help: "Comandos do perfil do usuário",
    execute
}
