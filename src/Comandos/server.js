const Discord = require('discord.js')

module.exports = {
  name: 'server',
  description: 'Mostra informações do server',
  ADMOnly: false,

  execute(bot, message, args) {
    const serverInfoEmbed = new Discord.MessageEmbed()
      .setColor('#34eb61')
      .setTitle('📝 Informações do Server')
      .setDescription('Informações sobre o servidor:')
      .setThumbnail(message.guild.iconURL())
      .addFields(
        {name: '🏷️ Nome do Servidor', value: `${message.guild.name}`},
        {name: '👥 Total de Membros', value: `${message.guild.memberCount} membros`},
        {name: '🌎 Região', value: `${message.guild.region.toUpperCase()}`}
      )
      message.reply('', serverInfoEmbed)}
}