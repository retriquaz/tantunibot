const {  } = require('discord.js');
var InfiniteLoop = require('infinite-loop');
var il = new InfiniteLoop;



exports.run = (bot, message, args) => {

  if(!message.content.startsWith("tb laf")){
    return;
  } else{

      function randomLaf() {
        return bot.config.rando_laf[Math.floor(Math.random() * bot.config.rando_laf.length)];
     };
         il.add(randomLaf, []);
           il.run();  //Random Laf

      let tag = args.slice(0).join(" ")

      if(tag == 'at'){

      message.channel.send(randomLaf())
}
}
}
