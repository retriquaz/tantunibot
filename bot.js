const Discord = require('discord.js');
const bot = new Discord.Client();
const Util = require('discord.js');
const fs = require('fs');
const Enmap = require("enmap");
const ffmpegPath = require('ffmpeg-binaries');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const config = require("./config.json");
bot.config = config;
var InfiniteLoop = require('infinite-loop');



const queue = new Map();
const youtube = new YouTube('AIzaSyAREmi9Z6LGMzgKkQW7O8U_GnHZTn1KVsc');
var prefix = config.prefix
var ownerId1 = config.ownerId1
var ownerId2 = config.ownerId2
var rando_laf = config.rando_laf
var GOOGLE_API_KEY = config.google
var il = new InfiniteLoop;
var helplist = fs.readFileSync('./help.txt', 'utf8');
bot.helplist = helplist
var helpmuzik = fs.readFileSync('./helpmuzik.txt', 'utf8');
bot.helpmuzik = helpmuzik



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
    console.log(`${commandName} Komutu yukleniyor`);
    bot.commands.set(commandName, props);
  });
});  //commands
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                          //Müzik Çalar

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('disconnect', () => console.log('Bağlantı koptu, Yeniden Bağlanılıyor...'));

bot.on('reconnecting', () => console.log('Bağlantı sağlandı!'));


bot.on('message', async message => { // eslint-disable-line
	if (message.author.bot) return undefined;
	if (!message.content.startsWith(prefix)) return undefined;

	const args = message.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);

	let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === 'oynat') {
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send('Fredboat (Müzik) kanalına geçiniz.!');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('Bulunduğun ses kanalına giriş yapamıyorum, Yetkilerimi kontrol et!');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('Bulunduğun ses kanalında konuşma yetkim yok!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return message.channel.send(`✅ Oynatma Listesi: **${playlist.title}** kuyruğa eklendi!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					message.channel.send(`
__**Müzik Seçimi:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

Listeden istediğiniz şarkının numarasını yazınız.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send('Bir şarkı seçmediniz veya yanlış seçim yaptınız. Tekrar deneyiniz.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('🆘 Arama sonucunda bir şey bulamadım.');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
	} else if (command === 'geç') {
		if (!message.member.voiceChannel) return message.channel.send('Bir ses kanalında değilsiniz!');
		if (!serverQueue) return message.channel.send('Her hangi bir şarkı çalmıyor.');
		serverQueue.connection.dispatcher.end('Geç komutu kullanıldı!');
		return undefined;
	} else if (command === 'temizle') {
		if (!message.member.voiceChannel) return message.channel.send('Bir ses kanalında değilsiniz!');
		if (!serverQueue) return message.channel.send('Her hangi bir şarkı çalmıyor.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Temizle komutu kullanıldı!');
		return undefined;
	} else if (command === 'ses') {
		if (!message.member.voiceChannel) return message.channel.send('Bir ses kanalında değilsiniz!');
		if (!serverQueue) return message.channel.send('Her hangi bir şarkı çalmıyor.');
		if (!args[1]) return message.channel.send(`Şu an ki ses seviyesi: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return message.channel.send(`Ses seviyesini **${args[1]}** ayarladım`);
	} else if (command === 'çp') {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`🎶 Şu an çalan parça: **${serverQueue.songs[0].title}**`);
	} else if (command === 'liste') {
		if (!serverQueue) return message.channel.send('Her hangi bir şarkı çalmıyor.');
		return message.channel.send(`
__**Şarkı sırası:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Şu an çalan:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'durdur') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Şarkı durdu!');
		}
		return message.channel.send('Her hangi bir şarkı çalmıyor.');
	} else if (command === 'devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Şarkı devam ediyor!');
		}
		return message.channel.send('Her hangi bir şarkı çalmıyor.');
	}

	return undefined;
});

async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = queue.get(message.guild.id);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Ses kanalına giremiyorum: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`Ses kanalına giremiyorum: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return message.channel.send(`✅ **${song.title}** Listeye eklendi!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Çalmaya başladı: **${song.title}**`);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



bot.on('ready', () => {
     bot.user.setActivity('Şeriatcilerle');
     console.log('Bot Hazır');
});    // bot hazır ve bot oyunu

bot.login(process.env.BOT_TOKEN)//process.env.BOT_TOKEN
