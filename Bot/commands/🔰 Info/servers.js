const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { swap_pages } = require("../../handlers/functions")
module.exports = {
  name: "servers",
  aliases: ["serversin"],
  category: "🔰 Info",
  description: "Shows in Which servers the Bot is in",
  usage: "servers",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      var guildsin = client.guilds.cache.sort((a,b)=> b.memberCount - a.memberCount).map(guild => `**\`${guild.name} (${guild.id})\`・**Members:** \`${guild.memberCount}\`**\n`);
      swap_pages(client, message, guildsin, `All **\`[${guildsin.length}] Guilds\` ${client.user.tag}** is in`);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> ERROR | An error occurred`)
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
