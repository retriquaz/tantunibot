const { EmbedBuilder } = require('discord.js');

exports.run = (bot, message, args) => {
  if(message.content !== "tb help"){
    return;
  } else{

  const embed = new EmbedBuilder()
    .setColor(0xFF0000)
    .setThumbnail(url='https://cdn.discordapp.com/attachments/453476121078661120/500399543267885066/logo.png')
    .setAuthor({name: "TantuniBot", iconURL: "https://cdn.discordapp.com/avatars/484411378556338179/62f4ef653ecb1d495eca978ff1ebd781.png?size=128"})
    .setFooter({text: "İçin Oluşturuldu", iconURL: message.member.displayAvatarURL()})
    .setTimestamp()
    .setDescription(bot.helplist)

    message.reply({content: "" + message.author.toString() + " TantuniBot Emrinde", embeds: [embed]});
}
}
