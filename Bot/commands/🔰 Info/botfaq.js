const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { duration } = require("../../handlers/functions")
const {MessageMenuOption, MessageMenu} = require("discord-buttons")
module.exports = {
    name: "botfaq",
    aliases: ["faq"],
    category: "🔰 Info",
    description: "Sends the FAQ Options for the BOT",
    usage: "botfaq",
    run: async (client, message, args, cmduser, text, prefix) => {
        let es = client.settings.get(message.guild.id, "embed")
    try{
      let milratodc = client.guilds.cache.get("773668217163218944")
      let milratomembers = await milratodc.members.fetch();
      let partnercount = milratomembers.filter(m => m.roles.cache.has("823150244509515807"))
      partnercount = partnercount.map(m=>m.id).length
      let menuoptions = [
        {
          value: "Creator / Features",
          description: "Who is my Creator? / What are my Features?",
          replymsg: "<:Milrato:840259659163893820> **__Milrato Development__ made me!**\n> <:Like:857334024087011378> **Their Website:** https://milrato.eu\n> <:Discord:787321652345438228> **Their Discord:** https://discord.gg/FQGXbypRf8\n``` ```***__You can join their Discord Server and get yourself a Bot like me, for FREE/CHEAP!__***\n``` ```:muscle: **__My Features__**" + `>>> **58+ Systems**, like: <:twitter:840255600851812393> **Twitter-** & <:Youtube:840260133686870036> **Youtube-Auto-Poster** \n**Application-**, Ticket-, **Welcome-Images-** and Reaction Role-, ... Systems\n:notes: An advanced <:Spotify:846090652231663647> **Music System** with **Audio Filtering**\n:video_game: Many **Minigames** and :joystick: **Fun** Commands (150+)\n:no_entry_sign: **Administration** and **Auto-Moderation** and way much more!\n\n**The Developer is: \`Tomato#6966\` <:TOMATO:858450817665204224>, Conact him if you wanna hire him!**`,
          emoji: "840259659163893820" //optional
        },
        {
          value: "Stats", //this is the label too, but you can define an extra label! like that: label: "WHATEVER",
          description: `See my Statistics!`,
          replymsg: `**__📈 Stats!__**\n>>> :gear: **${client.commands.map(a=>a).length} Commands**\n:file_folder: on **${client.guilds.cache.size} Guilds**\n⌚️ **${duration(client.uptime).map(i=> `\`${i}\``).join(", ")} Uptime**\n📶 **\`${Math.floor(client.ws.ping)}ms\` Ping**`,
          emoji: "📈" //optional
        },
        {
          value: "How to use me",
          description: `Let me explain you!`,
          replymsg: `**__❓ How do you use me?__**\n> My Prefix is: \`${prefix}\` but you can always **Ping** me instead!\n\n**Just use one of my ${client.commands.map(a=>a).length} Commands by typing:**\n> \`${prefix}commandname\`\n**Example:**\n> \`${prefix}help\`\n\n__**I have setups, this is how you manage them:**__\n>>> \`${prefix}setup\` and react with the Emoji for the right action,\nbut you can also do \`${prefix}setup-SYSTEM\` e.g. \`${prefix}setup-welcome\``,
          emoji: "❓"
        },
        {
          value: "Sponsor / Support us",
          description: `Thanks for everything, you'll get something back!`,
          replymsg: `**__There are several Sponsor Options:__**\n\n> <:PAYPAL:861207258846330880> **Paypal:**\n> https://paypal.me/MilratoDevelopment\n\n> <:PATREON:861207934070816849> **Patreon:**\n> https://www.patreon.com/MilratoDevelopment?fan_landing=true\n\n> 💸 **Donate via Paysafe, Sofort or others: (1/2)**\n> https://bero-host.de/spenden/qgswlxrzgtll\n\n> 💸 **Donate via Paysafe, Sofort or others: (2/2)**\n> https://mc-host24.de/donate/tomato\n\n> **Every donator** gets the **@DONATOR Role** on:\n> https://discord.gg/FQGXbypRf8\n\n\n> **Every Donator** with more then **10€** Gets a **Free Bot** of his **Choice**, **custom** or not! *(with/without src)*`,
          emoji: "861207258846330880"
        },
        {
          value: "Partners / Sponsors",
          description: `We are really proud of our Sponsors and Partners!`,
          replymsg: `<:BeroHost:852970925695041646> Our First/Main Sponsor is **Bero-Host.de** <:BeroHost:852970925695041646>\n> <:Like:857334024087011378> **Their Website:** https://bero-host.de\n> <:Discord:787321652345438228> **Their Discord:** https://discord.bero-host.de\n> *They provide us several HIGH QUALTIY __Servers__ which we are using for our HOSTING! **CHECK THEM OUT**!*\n\`\`\` \`\`\`<:Bittmax:840370610755862529> Our Second Sponsor is **Bittmax.de** <:Bittmax:840370610755862529>\n> <:Like:857334024087011378> **Their Website:** https://bittmax.de\n> <:Discord:787321652345438228> **Their Discord:** https://discord.gg/GgjJZCyYKD\n> *They provide us several __Servers__ which we are using for our PUBLIC BOT HOSTING! **CHECK THEM OUT**!*\n\`\`\` \`\`\`**__Partners__**\n> ***We currently have \`${partnercount} Partners\`, which get at least 1 FREE OP BOT***\n\`\`\` \`\`\`Wanna be a Partner/Sponsor too? Contact us in our <:Discord:787321652345438228> **Discord:** https://discord.gg/FQGXbypRf8 and open a Ticket in <#840491251278676008>`,
          emoji: "848233660390047825"
        },
        {
          value: "My Bot doesnt work",
          description: `If your Bot is not working do this:`,
          replymsg: `Contact us in Milrato Development <:Discord:787321652345438228> **Discord:** https://discord.gg/FQGXbypRf8 and open a Ticket in <#840332764603351101>\n\n***If it still responds with messages but doesn't work right, then you can try to do: \`${prefix}reloadbot\` / \`${prefix}cmdreload [CMDNAME]\`***`,
          emoji: "😓"
        },
        {
          value: "Change the Bot?",
          description: `There are several ways to adjust this Bot...`,
          replymsg: `If you are one of the OWNERs of **${client.user.tag}**, then those Commands are available for you:\n\n>>> \`${prefix}changename\` -- To Change the Bot Name\n\`${prefix}changeavatar\` -- To Change the Bot Avatar\n\`${prefix}prefix\` -- To Change the Bot Server-Prefix\n\`${prefix}changestatus\` -- To Change the Bot Status\n\`${prefix}setup-owner\` -- To Change the Bot Owners\n\`${prefix}setup-advertise\` -- To Enable/Disable Our ADS\n\`${prefix}setup-embed\` -- To Change the Embed Design in this SERVER`,
          emoji: "⚙️"
        },
      ]
      //define the selection
      let Selection = new MessageMenu()
        .setID('MenuSelection') 
        .setMaxValues(1) //OPTIONAL, this is how many values you can have at each selection
        .setMinValues(1) //OPTIONAL , this is how many values you need to have at each selection
        .setPlaceholder('Click me to make a Selection!');  //message in the content placeholder
      menuoptions.forEach(option => {
        let row = new MessageMenuOption()
          .setLabel(option.label ? option.label : option.value)
          .setValue(option.value) 
          .setDescription(option.description) 
          .setDefault() 
        if(option.emoji) row.setEmoji(option.emoji) 
        Selection.addOption(row)
      })
      //define the embed
      let MenuEmbed = new Discord.MessageEmbed()
      .setColor(es.color)
      .setAuthor("Bot Help", client.user.displayAvatarURL(), "https://discord.gg/FQGXbypRf8")
      .setDescription("***Select what you need in the `Selection` down Below!***")
      //send the menu msg
      let menumsg = await message.channel.send(MenuEmbed, Selection)
      //function to handle the menuselection
      function menuselection(menu) {
        let menuoptiondata = menuoptions.find(v=>v.value == menu.values[0])
        menu.reply.send(new Discord.MessageEmbed()
        .setColor(es.color)
        .setAuthor("Bot Help", client.user.displayAvatarURL(), "https://discord.gg/FQGXbypRf8")
        .setDescription(menuoptiondata.replymsg), true);
      }
      //Event
      client.on('clickMenu', (menu) => {
        if (menu.message.id === menumsg.id) {
          if (menu.clicker.user.id === cmduser.id) menuselection(menu);
          else menu.reply.send(`<:no:833101993668771842> You are not allowed to do that! Only: <@${cmduser.id}>`, true);
        }
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
