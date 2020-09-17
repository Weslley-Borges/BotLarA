const Discord = require("discord.js")
const bot = new Discord.Client()
const config = require("../config.json")
const fs = require("fs")
const path = require("path")

bot.queues = new Map()



//Initing the commands and systems

bot.commands = new Discord.Collection()
bot.systems = new Discord.Collection()
bot.databases = new Discord.Collection()

const CommandFiles = fs
  .readdirSync(path.join(__dirname,"./Comandos"))
  .filter(filename => filename.endsWith(".js") )
for(filename of CommandFiles){
  const command = require(`./Comandos/${filename}`)
  bot.commands.set(command.name, command)}

const SystemFiles = fs
  .readdirSync(path.join(__dirname,"./Sistema"))
  .filter(filename => filename.endsWith(".js") )
for(filename of SystemFiles){
  const system = require(`./Sistema/${filename}`)
  bot.systems.set(system.name, system)}

const dataFiles = fs
  .readdirSync(path.join(__dirname,"./databases"))
  .filter(filename => filename.endsWith(".js") )
for(filename of dataFiles){
  const database = require(`./databases/${filename}`)
  bot.databases.set(database.name, database)}


bot.on("ready", () => {
  console.log(`Bot bot foi iniciado, com ${bot.users.cache.size} usuários, em ${bot.channels.cache.size} canais.`)
  bot.user.setActivity(`temos ${bot.users.cache.size} usuários.`)})


bot.on("guildMemberAdd",member => {
  const embed = new MessageEmbed()
  .setAuthor(
    "Equipe Upping Developers Communnity (UDC)",
    `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`,
    'https://github.com/Weslley-Borges/BOTbot')
  .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
  .setTitle(`Seja bem-vindo ${member.username}`)
  .setColor('#0664c9')
  .setDescription(`
    Nós criamos essa comunidade para reunir as experiências e habilidades de vários programadores, sem distinção;
    Aqui você terá acesso a vários links que podem ser úteis para você, e também poderá construir um network com os membros,
    para começar, que tal você olhar os nossos comandos? digite !help .\n
    Contribua com o projeto do nosso sistema em: https://github.com/Weslley-Borges/BotLarA`);
  member.channel.send(embed);
  bot.user.setActivity(`temos ${bot.users.cache.size} usuários.`)})



bot.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return

  if(message.content.startsWith(config.prefix)){
    const args = message.content.slice(config.prefix.length).split(" ")
    const commandName = args.shift()

    try{ //Procura o comando na pasta "Comandos" para executá-lo
      const command = bot.commands.get(commandName)
      command.execute(bot, message, args)
    }catch(e){
      message.reply("o comando não foi encontrado :(")
      console.log(e)
			message.delete()
		}
  }else if(!message.content.startsWith(config.prefix)){
    try{bot.systems.get("moderate").execute(bot, message)
    }catch(e){
      message.reply("houve um erro no sistema, poderia chamar algum administrador ou responsável pelo projeto para consertar?")
      console.log("Houve um erro:\n",e)
      message.delete()
		}
  }
})
bot.login(config.token)