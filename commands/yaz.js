exports.run = (bot, message, args) => {

      if (message.author.id !== bot.config.ownerId2){
        message.reply("Bu komut için yetkin yok.")
        message.delete()
      }

     else {

       let yazı = args.slice(0).join(" ");
       message.delete();
       message.channel.send(yazı);

 };
}
