const Discord = require("discord.js");

exports.run = (bot, message, args) => {
  if(message.content !== "tb müzik"){
    return;
  } else{

  const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setThumbnail(url='https://cdn.discordapp.com/attachments/453476121078661120/500399543267885066/logo.png')
    .setAuthor("TantuniBot", "https://cdn.discordapp.com/avatars/484411378556338179/62f4ef653ecb1d495eca978ff1ebd781.png?size=128")
    .setFooter("İçin Oluşturuldu", message.author.avatarURL)
    .setTimestamp()
    .setDescription(bot.helpmuzik)

    message.channel.send("" + message.author.toString() + " İstek parça alınır", embed);
}
}
