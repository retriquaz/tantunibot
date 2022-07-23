exports.run = (bot, message, args) => {

	if(!message.content.startsWith("tb ")){
   return;
 }
  else if(message.content === "tb kurallar"){

	 message.reply("Birini Etiketlemeniz Lazım\nKullanım `tb kurallar @TAG`")

 }
  else if(message.content.includes("<@&")){
	 message.reply("OOOO delikanlı sakin ol ROL Etiketlemeye izin yok.")
	 }
  else if(message.content.includes("<@")){
      message.reply({content: "" + message.mentions.members.first().toString() + " Kaşgar Khanate Günde 3 kez kuralları okumanızı tavsiye eder. <#620678764124307456>"})

}
 else{
	message.reply("Birini Etiketlemeniz Lazım\nKullanım `tb kurallar @TAG`")
}

}
