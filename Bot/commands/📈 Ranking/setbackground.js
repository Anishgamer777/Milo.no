//Here the command starts
const config = require("../../botconfig/config.json")
var ee = require("../../botconfig/embed.json")
module.exports = {
	//definition
	name: "setbackground", //the name of the command 
	category: "📈 Ranking", //the category this will be listed at, for the help cmd
	aliases: ["setbg"], //every parameter can be an alias
	cooldown: 4, //this will set it to a 4 second cooldown
	usage: "setbackground <LINK>", //this is for the help command for EACH cmd
  	description: "Set the Background of the RANK CARD", //the description of the command

	//running the command with the parameters: client, message, args, user, text, prefix
  run: async (client, message, args, user, text, prefix) => {
	let ranking = client.setups.get(message.guild.id, "ranking");
	/**
	 *  ranking: {
	 *      enabled: true
	 *  },
	 */
		const { MessageEmbed } = require("discord.js");
	let disabled = new MessageEmbed()
    .setColor(ee.color)
    .setTitle("Your Owner disabled the Ranking-System! Sorry")
    .setFooter(ee.footertext, ee.footericon)
    .setThumbnail(ee.footericon)
	if(!ranking.enabled) return message.reply(disabled);

	let rembed = new MessageEmbed()
	.setColor(ee.color)
	.setTitle("What do u want to do?")
	.setDescription(`
**1.** \`Disable\` - *Send 1 to disable it*
**2.** \`Enter Url\` - *Just Send the Url*
`)
	.setFooter("Pick the INDEX NUMBER / send the IMAGE URl", ee.footericon)
	.setThumbnail(ee.footericon)
  var url;

  message.reply(rembed).then(msg => {
	msg.channel.awaitMessages(m => m.author.id === message.author.id, {
	  max: 1,
	  time: 30000,
	  errors: ['time']
	}).then(collected => {
	  switch (collected.first().content.toString()) {
		case "1":
		  client.setups.set(message.guild.id, "null", "ranking.backgroundimage")
		  break;
		default:
		  if (collected.first().attachments.size > 0) {
			if (collected.first().attachments.every(attachIsImage)) {

			  message.reply("Successfully, set your Background Image! Please make sure to **not** delete your Image from the Channel!")
			  client.setups.set(message.guild.id, url, "ranking.backgroundimage")
			} else {
			  message.reply("Could not your message as a backgroundimage")
			}
		  } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
			message.reply("Successfully, set your Background Image! Please make sure to **not** delete your Image from the Channel!")
			client.setups.set(message.guild.id, collected.first().content, "ranking.backgroundimage")
		  } else {
			message.reply("Could not your message as a backgroundimage")
		  }

		  break;
	  }

	  function attachIsImage(msgAttach) {
		url = msgAttach.url;

		//True if this url is a png image.
		return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
		  url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
		  url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
	  }
	});
  })
	}
}
//-CODED-BY-TOMATO#6966-//