const { EmbedBuilder } = require('discord.js');

exports.run = (bot, message, args) => {
  if(!message.content.startsWith("tb oyla")){
    return;
  } else{

       let soru = args.slice(0).join(" ");

       if (args.length === 0)
       return message.reply('Yanlış Kullanım   `tb oyla İÇERİK`')

       const embed = new EmbedBuilder()
         .setTitle("Oylama Başladı!")
         .setColor("#5599ff")
         .addFields({name: '\u200b', value: '\u200b' })
         .addFields({name: "Hemen Oyunu Kullan", value: `${soru}`})
         .addFields({name: '\u200b', value: '\u200b' })
         .setFooter({text: `Oylama Sahibi: ${message.author.username}`, iconURL: message.member.displayAvatarURL()})



       message.channel.send({content: " ", embeds: [embed]})
       .then(message => {
         message.react("👍")
         message.react('👎')
       .catch(() => console.error('Emoji gönderilemedi.'));
       });

       message.delete().catch(error => {
         message.channel.send(`Mesaj Silme Yetkim Yok. Oylama sahibinin mesajı silinemedi.`)});



}
}
