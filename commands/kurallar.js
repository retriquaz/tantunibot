exports.run = (bot, message, args) => {

       message.channel.send("" + message.mentions.members.first() + " Kaşgar Khanete Günde 3 kez kuralları okumanızı tavsiye eder.  " + message.guild.channels.find(channel => channel.name === "kurallar").toString() + "")
       .catch(() => console.error('Kurallar kanalı bulunamadı.'));

}
