const Discord = require("discord.js")
const LarA = new Discord.Client()
const config = require("../config.json")
const fs = require("fs")
const path = require("path")

LarA.commands = new Discord.Collection()
LarA.systems = new Discord.Collection()
LarA.queues = new Map()

const CommandFiles = fs
    .readdirSync(path.join(__dirname,"./Comandos"))
    .filter(filename => filename.endsWith(".js") )
for(filename of CommandFiles){
    const command = require(`./Comandos/${filename}`)
    LarA.commands.set(command.name, command)}

const SystemFiles = fs
    .readdirSync(path.join(__dirname,"./Sistema"))
    .filter(filename => filename.endsWith(".js") )
for(filename of SystemFiles){
    const system = require(`./Sistema/${filename}`)
    LarA.systems.set(system.name, system)}

//When LarA is ready
LarA.on("ready", () => {
    console.log(`Bot LarA foi iniciado, com ${LarA.users.cache.size} usuários, em ${LarA.channels.cache.size} canais.`)
    LarA.user.setActivity(`temos ${LarA.users.cache.size} usuários.`)})
//When a new member joined
LarA.on("guildMemberAdd",member => {
    LarA.reply(`\n@${member.nickname}\n
    Seja bem-vindo(a) ao servidor da Upping Devs.
    Nós criamos essa comunidade para reunir as experiências e habilidades de vários programadores, sem distinção.
    Aqui você terá acesso a vários links que podem ser úteis para você, etambém poderá construir um network com os membros.
    Para começar, que tal você olhar os nossos comandos? digite !help .\n
    Contribua com o projeto do nosso sistema em: https://github.com/Weslley-Borges/BOTLarA`)
    LarA.user.setActivity(`temos ${LarA.users.cache.size} usuários.`)})



//When an user send a message, start process
LarA.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return

    if(message.content.startsWith(config.prefix)){
        const args = message.content.slice(config.prefix.length).split(" ")
        const command = args.shift()
        //Procura o comando na pasta "Comandos",
        //se encontrar, vai executá-lo, senão,
        //manda uma mensagem de erro.
        try{
            LarA.commands.get(command).execute(LarA, message, args)
        }catch(e){
            message.reply("o comando não foi encontrado :(")
            console.log("Comando não encontrado:\n",e)}

    }else if(!message.content.startsWith(config.prefix)){
        try{
            LarA.systems.get("moderate").execute(LarA, message)
        }catch(e){
            message.reply("houve um erro no sistema, poderia chamar alguns administrador ou responsável pelo projeto para consertar?")
            console.log("Houve um erro:\n",e)}
    }
})
LarA.login(config.token)