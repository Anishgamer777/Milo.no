const Discord = require("discord.js");
const moment = require("moment");
let os = require("os");
let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { duration } = require("../../handlers/functions")
module.exports = {
    name: "botinfo",
    aliases: ["info", "about", "stats"],
    category: "🔰 Info",
    description: "Sends detailed info about the client",
    usage: "botinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
        let es = client.settings.get(message.guild.id, "embed")
    try{
      let tempmsg = await message.channel.send(new Discord.MessageEmbed().setColor(es.color).setAuthor("GETTING BOT INFORMATION DATA", "https://cdn.discordapp.com/emojis/756773010123522058.gif", "https://discord.gg/FQGXbypRf8"))
      cpuStat.usagePercent(function (e, percent, seconds) {
          if (e) {
              return console.log(String(e.stack).red);
          }
          let connectedchannelsamount = 0;
          let guilds = client.guilds.cache.map((guild) => guild);
          for (let i = 0; i < guilds.length; i++) {
              if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
          }
        const totalGuilds = client.guilds.cache.size;
        const totalMembers = client.users.cache.size;
                      
        let countertest = 0;
        countertest = 0;
        const botinfo = new Discord.MessageEmbed()
            .setAuthor(client.user.tag + " Information", es.footericon, "https://discord.com/api/oauth2/authorize?client_id=784364932149280778&permissions=8&scope=bot") 
            .setDescription(`\`\`\`yml\nName: ${client.user.tag} [${client.user.id}]\nBot Latency: ${Math.round(Date.now() - message.createdTimestamp)}ms\nApi Latency: ${Math.round(client.ws.ping)}ms\nRuntime: ${duration(client.uptime).join(", ")}\`\`\``)
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .addField("<:arrow:832598861813776394> General -- Stats", `\`\`\`yml\nServers: ${totalGuilds}\nUsers: ${totalMembers}\nConnections: ${connectedchannelsamount}\`\`\``, true)
            .addField("<:arrow:832598861813776394> Bot -- Stats", `\`\`\`yml\nNode.js: ${process.version}\nDiscord.js: v${Discord.version}\nEnmap: v5.8.4\`\`\``, true)
            .addField("<:arrow:832598861813776394> System -- Stats", `\`\`\`yml\nOS: Linux | Debian\nCPU Usage: ${percent.toFixed(2)} %\nRAM usage: ${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)} MB\`\`\``, true)
            .addField("<:arrow:832598861813776394> Developer", `\`\`\`yml\nName: Tomato#6966 [442355791412854784]\`\`\``)
            .addField("<:arrow:832598861813776394> Important Links", `**[Invite Link](https://discord.com/api/oauth2/authorize?client_id=784364932149280778&permissions=8&scope=bot)\`|\`[Support Server](https://discord.gg/pe3V7uT)\`|\`[Website](https://milrato.eu)\`|\`[Get Free Bots](https://discord.gg/FQGXbypRf8)**`)
            .setFooter(es.footertext, es.footericon);
        console.log("TEST")
        tempmsg.edit({embed: botinfo});
      });
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> An error occurred`)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
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
