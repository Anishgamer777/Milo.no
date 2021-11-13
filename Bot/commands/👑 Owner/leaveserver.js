const {
  MessageEmbed,
  splitMessage
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
const fs = require('fs');
var {
  databasing,
  isValidURL
} = require(`../../handlers/functions`);
const {
  inspect
} = require(`util`);
module.exports = {
  name: `leaveserver`,
  category: `👑 Owner`,
  aliases: [`serverleave`, "kickbot"],
  description: `Make the Bot Leave a specific Server`,
  usage: `leaveserver <GUILDID>`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!config.ownerIDS.includes(message.author.id))
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.user.username, es.footericon)
        .setTitle(`${emoji.msg.ERROR} You are not allowed to run this command! Only the Owner is allowed to run this Cmd`)
      );
    if (!args[0])
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.user.username, es.footericon)
        .setTitle(`${emoji.msg.ERROR} You have to add which Guild I should leave`)
        .setDescription(`Usage: \`${prefix}leaveserver <SERVERID>\``)
      );
    try {
      let guild = client.guilds.cache.get(args[0]);
      if(!guild) return message.reply(":x: Could not find the Guild to Leave")
      guild.leave().then(g=>{
        message.channel.send(`${emoji.msg.SUCCESS} Leaft ${g.name} | ${g.id}`)
      }).catch(e=>{
        message.reply(`${e.message ? e.message : e}`, {code: "js"})
      })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`${emoji.msg.ERROR} An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  },
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
