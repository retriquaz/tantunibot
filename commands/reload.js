exports.run = (bot, message, args) => {
  if(!message.content.startsWith("tb reload")){
    return;
  } else{

  if(message.author.id !== '288316237535248385'){
    message.reply("Bu komut için yetkin yok.")
    .catch(() => console.error(error));
  }

  else {
  if(!args || args.size < 1) return message.reply("Komutu yenilemek için komut adı girmelisiniz.");
  const commandName = args[0];
  // Check if the command exists and is valid
  if(!bot.commands.has(commandName)) {
    return message.reply("Bu isimde bir komut yok");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Enmap
  bot.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  bot.commands.set(commandName, props);
  message.reply(`${commandName} İsimli komut yenilendi.`);
}
}
};
