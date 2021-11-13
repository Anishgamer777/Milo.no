const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const moment = require('moment');
const { databasing, delay, getLatestVideos, channelInfo } = require('../../handlers/functions');
const { MessageButton, MessageActionRow } = require('discord-buttons')
module.exports = {
  name: "youtubeinfo",
  aliases: ["youtubeinfo", "youtubeuserinfo", "ytuserinfo", "ytuser", "youtubeuser"],
  category: "🔰 Info",
  description: "Get information about a Youtube Channel",
  usage: "youtubeinfo <TWITTERUSER>",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let button_back = new MessageButton().setStyle('blurple').setID('1').setLabel("<< Back")
      let button_forward = new MessageButton().setStyle('blurple').setID('3').setLabel('Forward >>') 
      const allbuttons = [button_back, button_forward]
      let url = args[0];
        if(url && typeof url == "string"){
          if(url.match(/^https?:\/\/(www\.)?youtube\.com\/(channel\/UC[\w-]{21}[AQgw]|(c\/|user\/)?[\w-]+)$/) == null)
            return message.channel.send(new MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(`<:no:833101993668771842> Please use a Valid Youtube Link`)
              .setDescription(`Example Usage: \`${prefix}youtubeinfo https://youtube.com/c/Tomato6966\``)
            );
        } else {
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> Please use a Valid Youtube Link`)
            .setDescription(`Example Usage: \`${prefix}youtubeinfo https://youtube.com/c/Tomato6966\``)
          );
        }
          
          let Channel = await channelInfo(url)
          let embed = new Discord.MessageEmbed()
              .setTitle(Channel.name)
              .setURL(Channel.url)
              .setColor("RED")
              .addField("**Subscribercount:**", "`" + Channel.subscribers + "`")
              .addField("**Tags:**", Channel.tags.map(t => `\`${t}\``).join(",  "))
              .addField("**Unlisted:**", Channel.unlisted ? "✅" : "❌", true)
              .addField("**FamilySafe:**", Channel.familySafe ? "✅" : "❌", true)
              .setFooter("ID: " + Channel.id)
              .setImage(Channel.mobileBanner[0]?.url)
              .setDescription(String(Channel.description).substr(0, 1500))
          let Videos = await getLatestVideos(url)
          let embed2 = new Discord.MessageEmbed()
            .setTitle(`Videos of ${Videos[0].author}`)
            .setColor("RED")
            .setURL(url)
          //For Each Video, add a new Field (just the first 10 Videos!)
            Videos.forEach((v, i) => {
                if (i < 10) {
                  embed2.addField(v.title, `[Watch it](${v.link}) | Published at: \`${v.pubDate}\``)
                }
            })
          //Send the Message
          let pagemsg = await message.channel.send({
              embed: embed, 
              buttons: allbuttons
          })
           //create a collector for the thinggy
        const collector = pagemsg.createButtonCollector(button => !button.clicker.user.bot, { time: 180e3 }); //collector for 5 seconds
        //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
        var edited = false;
        var embeds = [embed, embed2]        
        let currentPage = 0;
        collector.on('collect', async b => {
            if(b.clicker.user.id !== message.author.id)
              return b.reply.send(`:x: **Only the one who typed ${prefix}youtubeinfo is allowed to react!**`)
            //page forward
            if(b.id == "1") {
              //b.reply.send("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
                if (currentPage !== 0) {
                  await pagemsg.edit({embed:embeds[currentPage], buttons: allbuttons});
                  await b.reply.defer();
                } else {
                    currentPage = embeds.length - 1
                    await pagemsg.edit({embed:embeds[currentPage], buttons: allbuttons});
                    await b.reply.defer();
                }
            }

            //go forward
            else if(b.id == "3"){
              //b.reply.send("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
                if (currentPage < embeds.length - 1) {
                    currentPage++;
                    await pagemsg.edit({embed:embeds[currentPage], buttons: allbuttons});
                    await b.reply.defer();
                } else {
                    currentPage = 0
                    await pagemsg.edit({embed:embeds[currentPage], buttons: allbuttons});
                    await b.reply.defer();
                }
            }
        });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
    return;
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
