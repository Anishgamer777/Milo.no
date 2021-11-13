const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  duration
} = require("../../handlers/functions")
const { MessageButton, MessageActionRow } = require('discord-buttons')
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      if (args[0]) {
        const embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if(args[0].toLowerCase().includes("cust")){
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc


          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`🦾 **Custom Commands [${cuc[0].includes("NO") ? 0 : items.length}]**`)
            .setDescription(items.join(", "))
            .setFooter(`No custom information for the Custom Commands ;(`, client.user.displayAvatarURL());
          
          message.channel.send(embed)
          return;
        }var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.channel.send(embed.setColor(es.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`));
        } else if (!cmd && cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`MENU 🔰 **${category.toUpperCase()} [${items.length}]**`)
            .setFooter(`To see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.setDescription(`**${category.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n\n**Usage:**\n> \`${cmd.usage}\``);
            } catch {}
          } else {
            embed.setDescription(`${items.join(", ")}`)
          }
          return message.channel.send(embed)
        }
        if (cmd.name) embed.addField("**<:arrow:832598861813776394> Command name**", `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`<:arrow:832598861813776394> Detailed Information about: \`${cmd.name}\``);
        if (cmd.description) embed.addField("**<:arrow:832598861813776394> Description**", `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases) try {
          embed.addField("**<:arrow:832598861813776394> Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch {}
        if (cmd.cooldown) embed.addField("**<:arrow:832598861813776394> Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField("**<:arrow:832598861813776394> Cooldown**", `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField("**<:arrow:832598861813776394> Usage**", `\`\`\`${config.prefix}${cmd.usage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
        }
        if (cmd.useage) {
          embed.addField("**<:arrow:832598861813776394> Useage**", `\`\`\`${config.prefix}${cmd.useage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
        }
        return message.channel.send(embed);
      } else {
        let button_back = new MessageButton().setStyle('green').setID('1').setEmoji("833802907509719130").setLabel("Back")
        let button_home = new MessageButton().setStyle('blurple').setID('2').setEmoji("🏠").setLabel("Go Home")
        let button_forward = new MessageButton().setStyle('green').setID('3').setEmoji('832598861813776394').setLabel("Forward")
         
        let button_cat_information = new MessageButton().setStyle('blurple').setID('button_cat_information')/*.setLabel('​Information')*/.setEmoji("🔰").setDisabled(false);
        let button_cat_music = new MessageButton().setStyle('blurple').setID('button_cat_music')/*.setLabel('​Music Related')*/.setEmoji("🎶").setDisabled(false);
        let button_cat_settings = new MessageButton().setStyle('blurple').setID('button_cat_settings')/*.setLabel('​Settings & 👑 Owner & ⌨️Programming')*/.setEmoji("⚙").setDisabled(false);
        
        let button_cat_voice = new MessageButton().setStyle('blurple').setID('button_cat_voice')/*.setLabel('Voice & 📈 Ranking')*/.setEmoji("🎤").setDisabled(false);
        let button_cat_minigames = new MessageButton().setStyle('blurple').setID('button_cat_minigames')/*.setLabel('​Mini Games & 🕹️ Fun')*/.setEmoji("🎮").setDisabled(false);
        let button_cat_admin = new MessageButton().setStyle('blurple').setID('button_cat_admin')/*.setLabel('Administration & 💪 Setup')*/.setEmoji("🚫") .setDisabled(false);
        
        let button_cat_nsfw = new MessageButton().setStyle('blurple').setID('button_cat_nsfw')/*.setLabel('​NSFW')*/.setEmoji("🔞").setDisabled(false);
        let button_cat_customcommand = new MessageButton().setStyle('blurple').setID('button_cat_customcommand')/*.setLabel('​Custom Commands')*/.setEmoji("🦾").setDisabled(false);
        let button_cat_advertisement = new MessageButton().setStyle('blurple').setID('button_cat_advertisement')/*.setLabel('​Advertisement')*/.setEmoji("840259659163893820").setDisabled(false);
        let button_cat_overview = new MessageButton().setStyle('blurple').setID('button_cat_overview')/*.setLabel('​Advertisement')*/.setEmoji("833101995723194437").setDisabled(false);
        //array of all buttons
        

        let buttonRow1 = new MessageActionRow()
          .addComponent(button_back).addComponent(button_home).addComponent(button_forward)
        let buttonRow2 = new MessageActionRow()
          .addComponent(button_cat_information).addComponent(button_cat_music)
          .addComponent(button_cat_settings).addComponent(button_cat_admin).addComponent(button_cat_voice)
        let buttonRow3 = new MessageActionRow()
          .addComponent(button_cat_minigames).addComponent(button_cat_nsfw).addComponent(button_cat_customcommand).addComponent(button_cat_advertisement)      
          .addComponent(button_cat_overview)   

        const allbuttons = [buttonRow1, buttonRow2, buttonRow3]
        //define default embed
        let OverviewEmbed = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter("Page Overview\n"+ client.user.username + " | Made by: milrato.eu", client.user.displayAvatarURL())
        .setTitle(`Information about the <:clanbot:832697296687726654> Clan Bot: __**${client.user.username}**__`)
        .addField(":muscle: **__My Features__**",
`>>> **58+ Systems**, like: <:twitter:840255600851812393> **Twitter-** & <:Youtube:840260133686870036> **Youtube-Auto-Poster** 
**Application-**, Ticket-, **Welcome-Images-** and Reaction Role-, ... Systems
:notes: An advanced <:Spotify:846090652231663647> **Music System** with **Audio Filtering**
:video_game: Many **Minigames** and :joystick: **Fun** Commands (150+)
:no_entry_sign: **Administration** and **Auto-Moderation** and way much more!`)
        .addField(":question: **__How do you use me?__**",
`>>> \`${prefix}setup\` and react with the Emoji for the right action,
but you can also do \`${prefix}setup-SYSTEM\` e.g. \`${prefix}setup-welcome\``)
.addField(":chart_with_upwards_trend: **__STATS:__**",
`>>> :gear: **${client.commands.map(a=>a).length} Commands**
:file_folder: on **${client.guilds.cache.size} Guilds**
⌚️ **${duration(client.uptime).map(i=> `\`${i}\``).join(", ")} Uptime**
📶 **\`${Math.floor(client.ws.ping)}ms\` Ping**`)    
  let FIRSTEMBED = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter("Page Home\n"+ client.user.username + " | Made by: milrato.eu", client.user.displayAvatarURL())
        .setTitle(":gear: **__Command Category Overview__**")
.setDescription(`> <a:yes:833101995723194437> ... **Overview**

> 🔰 ... **Information**
> 🎶 ... **Music Related**
> ⚙ ... **Settings & 👑 Owner & ⌨️Programming**
> 🎤 ... **Voice & 📈 Ranking**
> 🎮 ... **Mini Games & 🕹️ Fun**
> 🚫 ... **Administration & 💪 Setup**
> 🔞 ... **NSFW**
> 🦾 ... **Custom Commands**
> <:Milrato:840259659163893820> ... **Advertisement**

> *Click on the Button Emojis to jump to the Command Category*
> *Use the Arrows to swap the Pages forward/backward/jump-back-home*`)          

        //Send message with buttons
        let helpmsg = await message.channel.send({   
            content: `***Click on the __Buttons__ to swap the Help-Pages***`,
            embed: FIRSTEMBED, 
            components: allbuttons
        });
        //create a collector for the thinggy
        const collector = helpmsg.createButtonCollector(button => !button.clicker.user.bot, { time: 180e3 }); //collector for 5 seconds
        //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
        var edited = false;
        var embeds = [FIRSTEMBED, OverviewEmbed]
        for(const e of allotherembeds())
          embeds.push(e)        
        let currentPage = 0;
        collector.on('collect', async b => {
            if(b.clicker.user.id !== message.author.id)
              return b.reply.send(`:x: **Only the one who typed ${prefix}help is allowed to react!**`, true)
            if(b.id.includes("button_cat_")){
              //b.reply.send(`***Going to the ${b.id.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
              //information, music, admin, settings, voice, minigames, nsfw
              let index = 0;
              switch (b.id.replace("button_cat_", "")){
                case "overview": index = 0; break;
                case "information": index = 1; break;
                case "music": index = 2; break;
                case "admin": index = 3; break;
                case "settings": index = 4; break;
                case "voice": index = 5; break;
                case "minigames": index = 6; break;
                case "nsfw": index = 7; break;
                case "customcommand": index = 8; break;
                case "advertisement": index = 9; break;
              }
              currentPage = index + 1;
              await helpmsg.edit({embed:embeds[currentPage], components: allbuttons});
              await b.reply.defer();
            } else {
              //page forward
              if(b.id == "1") {
                //b.reply.send("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
                  if (currentPage !== 0) {
                    currentPage -= 1
                    await helpmsg.edit({embed:embeds[currentPage], components: allbuttons});
                    await b.reply.defer();
                  } else {
                      currentPage = embeds.length - 1
                      await helpmsg.edit({embed:embeds[currentPage], components: allbuttons});
                      await b.reply.defer();
                  }
              }
              //go home
              else if(b.id == "2"){
                //b.reply.send("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
                  currentPage = 0;
                  await helpmsg.edit({embed:embeds[currentPage], components: allbuttons});
                  await b.reply.defer();
              } 
              //go forward
              else if(b.id == "3"){
                //b.reply.send("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
                  if (currentPage < embeds.length - 1) {
                      currentPage++;
                      await helpmsg.edit({embed:embeds[currentPage], components: allbuttons});
                      await b.reply.defer();
                  } else {
                      currentPage = 0
                      await helpmsg.edit({embed:embeds[currentPage], components: allbuttons});
                      await b.reply.defer();
                  }
              }
            }
        });
        
        let d_button_back = new MessageButton().setStyle('green').setID('1').setEmoji("833802907509719130").setLabel("Back")
        let d_button_home = new MessageButton().setStyle('blurple').setID('2').setEmoji("🏠").setLabel("Go Home")
        let d_button_forward = new MessageButton().setStyle('green').setID('3').setEmoji('832598861813776394').setLabel("Forward")
         
        let d_button_cat_information = new MessageButton().setStyle('blurple').setID('button_cat_information')/*.setLabel('​Information')*/.setEmoji("🔰").setDisabled(true);
        let d_button_cat_music = new MessageButton().setStyle('blurple').setID('button_cat_music')/*.setLabel('​Music Related')*/.setEmoji("🎶").setDisabled(true);
        let d_button_cat_settings = new MessageButton().setStyle('blurple').setID('button_cat_settings')/*.setLabel('​Settings & 👑 Owner & ⌨️Programming')*/.setEmoji("⚙").setDisabled(true);
        
        let d_button_cat_voice = new MessageButton().setStyle('blurple').setID('button_cat_voice')/*.setLabel('Voice & 📈 Ranking')*/.setEmoji("🎤").setDisabled(true);
        let d_button_cat_minigames = new MessageButton().setStyle('blurple').setID('button_cat_minigames')/*.setLabel('​Mini Games & 🕹️ Fun')*/.setEmoji("🎮").setDisabled(true);
        let d_button_cat_admin = new MessageButton().setStyle('blurple').setID('button_cat_admin')/*.setLabel('Administration & 💪 Setup')*/.setEmoji("🚫") .setDisabled(true);
        
        let d_button_cat_nsfw = new MessageButton().setStyle('blurple').setID('button_cat_nsfw')/*.setLabel('​NSFW')*/.setEmoji("🔞").setDisabled(true);
        let d_button_cat_customcommand = new MessageButton().setStyle('blurple').setID('button_cat_customcommand')/*.setLabel('​Custom Commands')*/.setEmoji("🦾").setDisabled(true);
        let d_button_cat_advertisement = new MessageButton().setStyle('blurple').setID('button_cat_advertisement')/*.setLabel('​Advertisement')*/.setEmoji("840259659163893820").setDisabled(true);
        let d_button_cat_overview = new MessageButton().setStyle('blurple').setID('button_cat_overview')/*.setLabel('​Advertisement')*/.setEmoji("833101995723194437").setDisabled(true);
        //array of all buttons
        

        let d_buttonRow1 = new MessageActionRow()
          .addComponent(d_button_back).addComponent(d_button_home).addComponent(d_button_forward)
        let d_buttonRow2 = new MessageActionRow()
          .addComponent(d_button_cat_information).addComponent(d_button_cat_music)
          .addComponent(d_button_cat_settings).addComponent(d_button_cat_admin).addComponent(d_button_cat_voice)
        let d_buttonRow3 = new MessageActionRow()
          .addComponent(d_button_cat_minigames).addComponent(d_button_cat_nsfw).addComponent(d_button_cat_customcommand).addComponent(d_button_cat_advertisement)         
          .addComponent(d_button_cat_overview)
        const alldisabledbuttons = [d_buttonRow1, d_buttonRow2, d_buttonRow3]
        collector.on('end', collected => {
          edited = true;
          helpmsg.edit({content: `Time has ended type ${prefix}help again!`, embed: helpmsg.embeds[0], components: alldisabledbuttons})
        });
        setTimeout(()=>{
          if(!edited)
            helpmsg.edit({content: `Time has ended type ${prefix}help again!`, embed: helpmsg.embeds[0], components: alldisabledbuttons})
        }, 180e3 + 150)
      }
        function allotherembeds(){
          const settings = client.settings.get(message.guild.id);
          var embeds = [];
          var embed0 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🔰 Information Commands 🔰`)
            .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🔰 Info").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.ECONOMY ? "💸 **Economy** | <a:yes:833101995723194437> ENABLED" : "💸 **Economy** | <:no:833101993668771842> DISABLED",`> ${client.commands.filter((cmd) => cmd.category === "💸 Economy").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.SCHOOL ? "🏫 **School** | <a:yes:833101995723194437> ENABLED" : "🏫 **School** | <:no:833101993668771842> DISABLED", `> ${client.commands.filter((cmd) => cmd.category === "🏫 School Commands").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Page 1 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed0)
          var embed1 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🎶 Music Related Commands :notes:`)
            .setDescription(`🎶 **Music**${settings.MUSIC ? " | <a:yes:833101995723194437> ENABLED" : " | <:no:833101993668771842> DISABLED"}\n> ${client.commands.filter((cmd) => cmd.category === "🎶 Music").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MUSIC ? "👀 **Filter** | <a:yes:833101995723194437> ENABLED" : "👀 **Filter** | <:no:833101993668771842> DISABLED", `>>> ${client.commands.filter((cmd) => cmd.category === "👀 Filter").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MUSIC ? "⚜️ **Custom Queue(s)** | <a:yes:833101995723194437> ENABLED" : "⚜️ **Custom Queue(s)** | <:no:833101993668771842> DISABLED", `> ${client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").map((cmd) => `${cmd.extracustomdesc}`).join(", ")}`.substr(0, 1024))
            .setFooter(`Page 2 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed1)
          var embed2 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🚫 Administration & Setup Commands 💪`)
            .setDescription(`🚫 **Admin**\n> ${client.commands.filter((cmd) => cmd.category === "🚫 Administration").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField("💪 **Setup**", `>>> ${client.commands.filter((cmd) => cmd.category === "💪 Setup").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Page 3 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed2)
          var embed3 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`⚙️ Settings & Owner Commands 👑`)
            .setDescription(`⚙️ **Settings**\n> ${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField("👑 **Owner**", `>>> ${client.commands.filter((cmd) => cmd.category === "👑 Owner").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField("⌨️ **Programming**", `${client.commands.filter((cmd) => cmd.category === "⌨️ Programming").map((cmd) => `\`${cmd.name}\``).join(", ")}`.substr(0, 1024))
            .setFooter(`Page 4 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed3)
          var embed4 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🎤 Voice & Ranking Commands 📈`)
            .setDescription(`🎤 **Voice**${settings.VOICE ? " | <a:yes:833101995723194437> ENABLED" : " | <:no:833101993668771842> DISABLED"}\n> ${client.commands.filter((cmd) => cmd.category === "🎤 Voice").map((cmd) => `${cmd.extracustomdesc}`)}`)
            .addField("📈 **Ranking**", `>>> ${client.commands.filter((cmd) => cmd.category === "📈 Ranking").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.SOUNDBOARD ? "🔊 **Soundboard** | <a:yes:833101995723194437> ENABLED" : "🔊 **Soundboard** | <:no:833101993668771842> DISABLED", `${client.commands.filter((cmd) => cmd.category === "🔊 Soundboard").map((cmd) => `\`${cmd.name}\``).join(", ")}`.substr(0, 1024))
            .setFooter(`Page 5 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed4)
          var embed5 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🎮 Mini Games & Fun Commands 🕹️`)
            .setDescription(`🕹️ **Fun**${settings.FUN ? " | <a:yes:833101995723194437> ENABLED" : " | <:no:833101993668771842> DISABLED"}\n> ${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MINIGAMES ? "🎮 **Mini Games** | <a:yes:833101995723194437> ENABLED" : "🎮 **Mini Games**| <:no:833101993668771842> DISABLED", `> ${client.commands.filter((cmd) => cmd.category === "🎮 MiniGames").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Page 6 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed5)
          var embed6 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(settings.NSFW ? "🔞 NSFW Commands 🔞 | <a:yes:833101995723194437> ENABLED" : "🔞 NSFW Commands 🔞 | <:no:833101993668771842> DISABLED")
            .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🔞 NSFW").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Page 7 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed6)
          
          var embed7 = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle("🦾 Custom Commands")
          .setFooter(`Page 8 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc
            embed7.setTitle(`🦾 **Custom Commands [${cuc[0].includes("NO") ? 0 : items.length}]**`)
            embed7.setDescription(items.join(", "))
        
          embeds.push(embed7)
        
        var embed8 = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle("<:Milrato:840259659163893820>] Bot Creator Company Advertisment")
          .setImage("https://cdn.discordapp.com/attachments/808335747882942464/838362966658514954/standard.gif")
          .addField("<:BeroHost:852970925695041646> __**Bero-Host.de**・Best Root Servers__", `> ***[Milrato Development](https://discord.gg/FQGXbypRf8) partnered with:***\n> [**Bero-Host.de**](
http://bero-host.de/?utm_source=bot&utm_medium=cpc&utm_id=milrato)`)
          .addField(`<:Milrato:840259659163893820> **__Bot Creator Information__**`,`>>> 💯 This Bot has been made by:\n[**Milrato Development**](https://milrato.eu)・[Discord](https://discord.com/invite/FQGXbypRf8)<:Discord:787321652345438228> [Click here to order yourself a own one](https://discord.com/invite/FQGXbypRf8)`)
          .setFooter(`Page 9 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
        embeds.push(embed8)
      
 

          return embeds
        }
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
