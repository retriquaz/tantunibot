const Discord = require("discord.js");

exports.run = (bot, message, args) => {

       let soru = args.slice(0).join(" ");

       if (args.length === 0)
       return message.reply('Yanlış Kullanım   `tb oyla İÇERİK`')

       const embed = new Discord.RichEmbed()
         .setTitle("Oylama Başladı!")
         .setColor("#5599ff")
         .setDescription(`${soru}`)
         .setFooter(`Oylama Sahibi: ${message.author.username}`, `${message.author.avatarURL}`)



       message.channel.send(embed)
       .then(message => {
         message.react("👍")
         message.react('👎')
       .catch(() => console.error('Emoji gönderilemedi.'));
       });

       message.delete();



}
