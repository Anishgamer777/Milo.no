const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "getinvitechannel",
  category: "🔰 Info",
  usage: "getinvitechannel",
  description: "Gives you an Invite link for an Channel",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let Channel = message.mentions.channels.first()
      if(!Channel) Channel = await client.channels.fetch(args[0])
      if(!Channel) return message.reply(":x: You didn't provided a Channel")
      let msg = await client.getInvite(Channel.id)
      message.channel.send(msg);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
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
