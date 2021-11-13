const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  GetUser,
  GetGlobalUser
} = require("../../handlers/functions")
const fetch = require("node-fetch")
module.exports = {
  name: "color",
  aliases: ["hexcolor"],
  category: "🔰 Info",
  description: "Get Hex Color Information",
  usage: "color <HEX CODE> | Example: color #ee33ff",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {

      const url = (`https://api.popcatdev.repl.co/color/${args[0].includes("#") ? args[0].split("#")[0] : args[0] }`)
      let json;
      try {
        json = await fetch(url).then(res => res.json())
      } catch (e) {
        return message.reply(`${e.message ? e.message : e}`, {
          code: "js"
        })
      }
      if (json.error) return message.reply(`Invalid Hex Color!\n${json.error}`, {
        code: "js"
      })
      const embed = new Discord.MessageEmbed()
        .setTitle("Color Info")
        .addField('<:arrow:832598861813776394> **Name**', json.name, true)
        .addField("<:arrow:832598861813776394> **Hex**", json.hex, true)
        .addField("<:arrow:832598861813776394> **RGB**", json.rgb, true)
        .addField("<:arrow:832598861813776394> **Brighter Shade**", json.brightened, true)
        .setImage(json.color_image)
        .setColor(json.hex)
      message.channel.send({
        embed: embed
      })
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
