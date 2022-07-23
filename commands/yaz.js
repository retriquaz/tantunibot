exports.run = (bot, message, args) => {
  if(!message.content.startsWith("tb yaz")){
    return;
  } else{

      if (message.author.id === bot.config.ownerId2){

        let yazı = args.slice(0).join(" ")
        message.delete().catch(error => {
          message.reply(`Mesaj Silme Yetkim Yok.`)})
        message.channel.send(yazı)
        .catch(console.error);

      }

     else if (message.author.id === bot.config.ownerId1){

       let yazı = args.slice(0).join(" ")
       message.delete().catch(error => {
         message.reply(`Mesaj Silme Yetkim Yok.`)})
       message.channel.send(yazı)
       .catch(console.error);

     }

     else if (message.author.id === bot.config.ownerId3){

       let yazı = args.slice(0).join(" ")
       message.delete().catch(error => {
         message.reply(`Mesaj Silme Yetkim Yok.`)})
       message.channel.send(yazı)
       .catch(console.error);

     }

	else if (message.author.id === bot.config.ownerId4){

      let yazı = args.slice(0).join(" ")
      message.delete().catch(error => {
        message.reply(`Mesaj Silme Yetkim Yok.`)})
      message.channel.send(yazı)
      .catch(console.error);

     }

     else {

       message.reply("Bu komut için yetkin yok.")
       message.delete().catch(error => {
         message.reply(`Mesaj Silme Yetkim Yok.`)})

 };
}
}
