exports.run = (bot, message, args) => {
  if(message.content !== "tb kurallar"){
    return;
  } else{
       message.channel.send("" + message.mentions.members.first() + " Kaşgar Khanate Günde 3 kez kuralları okumanızı tavsiye eder.  " + message.guild.channels.find(channel => channel.name === "kurallar").toString() + "")
       .catch(() => console.error('Kurallar kanalı bulunamadı.'));
}
}
