const ytSearch= require("yt-search")
const ytdl = require("ytdl-core-discord")

const execute = (bot, message, args) => {
    var Task = args[0]
    args.shift()
    const uniqueArg = args.join(" ")
    if(Task == "play"){Search(bot,message,uniqueArg)
    }else if(Task == "pause"){Pause(bot,message)
    }else if(Task == "resume"){Resume(bot,message)
    }else if(Task == "stop"){Stop(bot,message)
    }else Skip(bot,message)
}
function  Search(bot,message,Searching){
    //A procura do vídeo no Youtube
    try{
        ytSearch(Searching,(err,result) => {
            if(err){ throw err
            }else if(result && result.videos.length > 0){
                const song = result.videos[0];
                const queue = bot.queues.get(message.guild.id)
                if(queue){
                    queue.songs.push(song)
                    bot.queues.set(message.guild.id, queue)
                }else Playsong(bot, message, song)
            }else return message.reply(`não encontrei ${uniqueArg} no youtube`)})
    }catch(e){console.log("Houve um erro:\n",e)}}

const Playsong = async (bot, message, song) => {
    let queue = bot.queues.get(message.guild.id)
    if(!song && queue){
        queue.connection.disconnect()
        return bot.queues.delete(message.member.guild.id)}
    if(!message.member.voice.channel) return message.reply("você precisa estar em um canal de voz.")
    if(!queue){
        const conn = await message.member.voice.channel.join()
        queue = {volume: 10, connection: conn, dispatcher: null, songs: [song]}
        queue.dispatcher = await  queue.connection.play(await ytdl(song.url,{
            hightWaterMark: 1<<25, 
            filter: "audioonly"}),{type: "opus"})
        queue.dispatcher.on("finish", () => {
            queue.songs.shift()
            Playsong(bot, message, queue.songs[0])})
        bot.queues.set(message.guild.id, queue)
    }else{
        queue.songs.push(song)
        bot.queues.set(message.guild.id, queue)
    }
    let msg = "\n**---- Playlist ----**\n\n"
    queue.songs.forEach( music => {
        msg += `__**${music.title}**__\n`
    })
    LarA.user.setActivity("Tocando música")
    message.reply(msg)    
}
// Outros comandos
function Pause(bot, message){
    const queue = bot.queues.get(message.guild.id)
    if(!queue)return message.reply("não existe nenhuma música em reprodução")
    queue.dispatcher.pause()}
function Resume(bot, message){
    const queue = bot.queues.get(message.guild.id)
    if(!queue)return message.reply("não existe nenhuma música em reprodução")
    queue.dispatcher.resume()}
function Stop(bot, message){
    const queue = bot.queues.get(message.guild.id)
    if(!queue)return message.reply("não existe nenhuma música em reprodução")
    queue.songs = []
    bot.queues.set(message.guild.id, queue)
    queue.dispatcher.end()
    LarA.user.setActivity(`temos ${LarA.users.cache.size} usuários.`)}
function Skip(bot, message){
    const queue = bot.queues.get(message.guild.id)
    if(!queue)return message.reply("não existe nenhuma música em reprodução")
    queue.songs.shift()
    bot.queues.set(message.guild.id, queue)
    Playsong(bot, message, queue.songs[0])}

var part1 = "Comandos para a reprodução de músicas\n**!m play** - Toca uma música\n"
var part2 = "**!m pause** - Pausa a reprodução da musica\n**!m resume** - Continua a reprodução da música\n"
var part3 = "**!m stop** - Para a reprodução de música\n**!m skip** - PUla para a próxima música"
module.exports = {name: "m", help: part1+part2+part3, execute}