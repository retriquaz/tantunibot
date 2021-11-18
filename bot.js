const Discord = require('discord.js');
const bot = new Discord.Client();
const Util = require('discord.js');
const fs = require('fs');
const Enmap = require("enmap");
const config = require("./config.json");
bot.config = config;
var InfiniteLoop = require('infinite-loop');


var prefix = config.prefix
var ownerId1 = config.ownerId1
var ownerId2 = config.ownerId2
var ownerId3 = config.ownerId3
var rando_laf = config.rando_laf
var il = new InfiniteLoop;
var helplist = fs.readFileSync('./help.txt', 'utf8');
bot.helplist = helplist


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
  });
}); //events

bot.commands = new Enmap();  //enmap

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`${commandName} Komutu Yukleniyor`);
    bot.commands.set(commandName, props);
  });
});  //commands
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////

bot.login(process.env.BOT_TOKEN)//process.env.BOT_TOKEN
