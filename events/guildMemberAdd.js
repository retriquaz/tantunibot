const Discord = require("discord.js");
module.exports = (bot, member) => {
 const genel = member.guild.channels.find(channel => channel.name === "geçici-konuşma-odası");
 const sıra = member.guild.channels.find(channel => channel.name === "yönetici-özel");
 if(genel){
 genel.send(`<@${member.user.id}> Hoşgeldin şu an onay sürecindesiniz. Onay alana kadar gerekli bilgileri okumanız tavsiye edilir.`+ member.guild.channels.find(channel => channel.name === "geçici-konuşma-odası").toString() + ` Bu kanaldan diğer onay bekleyenler ile sohbet edebilirsiniz. Kuralları okumak için ` + member.guild.channels.find(channel => channel.name === "kurallar").toString() + ` kanalına gidiniz. `);
 }
 if(sıra){
   sıra.send(`<@${member.user.id}> Adlı kullanıcı onay beklemektedir.`);
 }
 var rol = member.guild.roles.find(role => role.name === 'yeniler');
 member.addRole(rol)
 .catch(console.error);
}
