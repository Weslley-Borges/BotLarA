const ytSearch= require("yt-search")
const ytdl = require("ytdl-core-discord")

const execute = (LarA, message, args) => {
    var Task = args[0]
    args.shift()
    const uniqueArg = args.join(" ")
    if(Task == "play"){Search(LarA,message,uniqueArg)
    }else if(Task == "pause"){Pause(LarA,message)
    }else if(Task == "resume"){Resume(LarA,message)
    }else if(Task == "stop"){Stop(LarA,message)
    }else Skip(LarA,message)
}
function  Search(LarA,message,Searching){
    //A procura do vídeo no Youtube
    try{
        ytSearch(Searching,(err,result) => {
            if(err){ throw err
            }else if(result && result.videos.length > 0){
                const song = result.videos[0];
                const queue = LarA.queues.get(message.guild.id)
                if(queue){
                    queue.songs.push(song)
                    LarA.queues.set(message.guild.id, queue)
                }else Playsong(LarA, message, song)
            }else return message.reply(`não encontrei ${uniqueArg} no youtube`)})
    }catch(e){console.log("Houve um erro:\n",e)}}

const Playsong = async (LarA, message, song) => {
    let queue = LarA.queues.get(message.guild.id)
    if(!song && queue){
        queue.connection.disconnect()
        return LarA.queues.delete(message.member.guild.id)}
    if(!message.member.voice.channel) return message.reply("você precisa estar em um canal de voz.")
    if(!queue){
        const conn = await message.member.voice.channel.join()
        queue = {volume: 10, connection: conn, dispatcher: null, songs: [song]}
        queue.dispatcher = await  queue.connection.play(await ytdl(song.url,{
            hightWaterMark: 1<<25, 
            filter: "audioonly"}),{type: "opus"})
        queue.dispatcher.on("finish", () => {
            queue.songs.shift()
            Playsong(LarA, message, queue.songs[0])})
        LarA.queues.set(message.guild.id, queue)
    }else{
        queue.songs.push(song)
        LarA.queues.set(message.guild.id, queue)
    }
    let msg = "**|=|=|= Playlist =|=|=|**\n\n"
    queue.songs.forEach( music => {
        msg += `__**${music.title}**__\n`
    })
    message.reply(msg)    
}
// Outros comandos
function Pause(LarA, message){
    const queue = LarA.queues.get(message.guild.id)
    if(!queue)return message.reply("não existe nenhuma música em reprodução")
    queue.dispatcher.pause()}
function Resume(LarA, message){
    const queue = LarA.queues.get(message.guild.id)
    if(!queue)return message.reply("não existe nenhuma música em reprodução")
    queue.dispatcher.resume()}
function Stop(LarA, message){
    const queue = LarA.queues.get(message.guild.id)
    if(!queue)return message.reply("não existe nenhuma música em reprodução")
    queue.songs = []
    LarA.queues.set(message.guild.id, queue)
    queue.dispatcher.end()}
function Skip(LarA, message){
    const queue = LarA.queues.get(message.guild.id)
    if(!queue)return message.reply("não existe nenhuma música em reprodução")
    queue.songs.shift()
    LarA.queues.set(message.guild.id, queue)
    Playsong(LarA, message, queue.songs[0])}

var part1 = "Comandos para a reprodução de músicas\n**!m play** - Toca uma música\n"
var part2 = "**!m pause** - Pausa a reprodução da musica\n**!m resume** - Continua a reprodução da música\n"
var part3 = "**!m stop** - Para a reprodução de música\n**!m skip** - PUla para a próxima música"
module.exports = {name: "m", help: part1+part2+part3, execute}