module.exports = (bot, ready) => {
  var channel = bot.channels.get('306074549299183637')
  bot.user.setActivity('Şeriatcilerle');
  console.log('Bot Hazır');
  setInterval(function(){
   channel.send("Kangal Botun Yeniliklerini `kb updates` Yazarak Bulabileceğinizi Biliyor muydunuz?");
}, 3600000);
};
