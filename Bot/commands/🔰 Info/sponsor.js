const {MessageEmbed} =require("discord.js")
const config = require("../../botconfig/config.json")
var ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
		name: "sponsor",
		category: "🔰 Info",
	  aliases: [""],
	  description: "Shows the sponsor of this BoT",
	  useage: "sponsor",
	  run: async (client, message, args) => {
		try{
		  
	  	message.channel.send(new MessageEmbed()
		    .setColor(ee.color)
		    .setTitle("Mc-Host24.de | German Hosting")
		    .setURL("https://mc-host24.de")
		    .setDescription(`
Second Sponsor of This Bot is:
**MC-HOST24** THE BEST MC HOSTER
<:arrow:832598861813776394> MC-HOST24.de is sponsoring them with some monthly Money,
<:arrow:832598861813776394> Thanks to them, they able to host their Website and GAME SERVERS
<:arrow:832598861813776394> Our suggestion is, if you want to host games / Websites, then go to [mc-host24.de](https://mc-host24.de/user/affiliate/3121)

**What they are offering:**
<:arrow:832598861813776394> **>>** Minecraft Hosting, CounterStrike: Global Offensive, Garry's Mod, ARK, ARMA 3, ...
<:arrow:832598861813776394> **>>** Cheap and fast Domains
<:arrow:832598861813776394> **>>** WEBHOSTING
<:arrow:832598861813776394> **>>** TEAMSPEAK SERVERS
<:arrow:832598861813776394> **>>** Linux & Windows Root Servers

[**Discord Server:**](https://discord.com/invite/4dGuGXK4A4)
[**Website:**](https://mc-host24.de/user/affiliate/3121)
[**__SPONSOR LINK!__**](https://mc-host24.de/donate/tomato)
`)
		    .setImage("https://cdn.discordapp.com/attachments/807985610265460766/822982906325631006/asdasdasdasdasd.png")
		    .setFooter("Mc-Host24", "https://cdn.discordapp.com/icons/619465432293965864/4c101b43466708cec4506938154a4e34.webp")
		).catch(e => console.log(String(e.stack).yellow));
		message.channel.send(new MessageEmbed()
			.setColor(ee.color)
			.setTimestamp()
			.setFooter("Bittmax.de | Code  'x10'  == -5%", "https://cdn.discordapp.com/icons/784157254847954964/482b9e96414509756fc0192829382776.webp")
			.setImage("https://cdn.discordapp.com/attachments/807985610265460766/822982640000172062/asdasdasdasdasd.png")
			.setTitle("Milrato | Service -- Bittmax")
			.setURL("https://milrato.eu")
			.setDescription(`
<:arrow:832598861813776394> [Milrato Service](https://discord.gg/FQGXbypRf8) made this Bot for us. It is free and also hosted on their sponsor: [Bittmax.de](https://bittmax.de)

<:arrow:832598861813776394> If you use the code: **\`x10\`** their, then you'll get at least 5% off everything!

<:arrow:832598861813776394> Check out Milrato's [Service-Website](https://milrato) and their [Discord](https://discord.gg/FQGXbypRf8) to get your own Bot too!

<:arrow:832598861813776394> It's hosted **24/7**, as already said, thanks to their Sponsor [**Bittmax.de**](https://bittmax.de)!

<:arrow:832598861813776394> Join [Bittmax's Discord Server](https://discord.gg/GgjJZCyYKD) and order **cheap** and high quality **Servers** today!`)
		).catch(e => console.log(String(e.stack).yellow));
		} catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`<:no:833101993668771842> An error occurred`)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        );
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
