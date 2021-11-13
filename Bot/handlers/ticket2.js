const ee = require("../botconfig/embed.json")
const {
  MessageEmbed,
  Message,
} = require(`discord.js`);

module.exports = (client) => {
  let disabled = new MessageEmbed()
    .setColor(ee.wrongcolor)
    .setTitle("Your Owner disabled the Ticket-System! Sorry")
    .setFooter(ee.footertext, ee.footericon).setColor(ee.wrongcolor)
    .setThumbnail(ee.footericon)

  client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    client.setups.ensure(reaction.message.guild.id, {
      enabled: false,
      guildid: reaction.message.guild.id,
      messageid: "",
      channelid: "",
      parentid: "",
      message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
      adminroles: []
    }, "ticketsystem2");
    client.setups.ensure("TICKETS", {
      tickets: [],
      tickets2: [],
      tickets3: [],
      tickets4: [],
      tickets5: [],
      applytickets1: [],
      applytickets2: [],
      applytickets3: [],
      applytickets4: [],
      applytickets5: []
    })

    let ticket = client.setups.get(reaction.message.guild.id, "ticketsystem2");
    if (reaction.message.guild.id === ticket.guildid && reaction.message.id === ticket.messageid) {
      reaction.users.remove(user).catch(e => console.log(e))
      if (!ticket.enabled) return user.send(disabled).catch(e => console.log(e));

      if (client.setups.get("TICKETS", "tickets2").includes(user.id)) {
        var es = client.settings.get(reaction.message.guild.id, "embed")
        try {
          var ticketchannel = reaction.message.guild.channels.cache.get(client.setups.get(user.id, "ticketid2"))
          if (!ticketchannel || ticketchannel == null || !ticketchannel.id || ticketchannel.id == null) throw {
            message: "NO TICKET CHANNEL FOUND AKA NO ANTISPAM"
          }
          return user.send(new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)

            .setTitle("Sorry, but you have an already open ticket!")
            .setDescription(`<#${client.setups.get(user.id, "ticketid2")}>`));
        } catch {
          client.setups.remove("TICKETS", user.id, "tickets2")
        }

      }

      let channelname = `ticket-${user.username}`.replace(" ", "-").substr(0, 31);

      reaction.message.guild.channels.create(channelname.substr(0, 31), {
        topic: `ticket-${user.id}`
      }).then(ch => {
        if (reaction.message.guild.roles.cache.some(r => ticket.adminroles.includes(r.id))) {
          for (let i = 0; i < ticket.adminroles.length; i++) {
            try {
              ch.updateOverwrite(ticket.adminroles[i], { //ticket support role id
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
              });
            } catch (error) {
              console.log(error.stack)
            }
          }
        }
        let es = client.settings.get(reaction.message.guild.id, "embed")
        client.setups.push("TICKETS", user.id, "tickets2");
        client.setups.push("TICKETS", ch.id, "tickets2");
        client.setups.set(user.id, ch.id, "ticketid2");
        client.setups.set(ch.id, {
          user: user.id,
          channel: ch.id,
          guild: reaction.message.guild.id,
          type: "ticket-setup-2",
          state: "open",
          date: Date.now(),
        }, "ticketdata");

        var ticketembed = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(`To close/manage this ticket type: ${client.settings.get(reaction.message.guild.id, "prefix")}ticket`, es.footericon)

          .setAuthor(`Ticket for: ${user.tag}`, user.displayAvatarURL({
            dynamic: true
          }), "https://discord.gg/FQGXbypRf8")
          .setDescription(ticket.message.replace("{user}", `${user}`))

          const { MessageButton } = require('discord-buttons')
          let button_close = new MessageButton().setStyle('red').setID('ticket_close').setLabel('Close').setEmoji("🔒")
          let button_delete = new MessageButton().setStyle('grey').setID('ticket_delete').setLabel("Delete").setEmoji("🗑️")
          let button_transcript = new MessageButton().setStyle('blurple').setID('ticket_transcript').setLabel("Transcript").setEmoji("📑")
          let button_user = new MessageButton().setStyle('green').setID('ticket_user').setLabel("Users").setEmoji("👤")
          let button_role = new MessageButton().setStyle('green').setID('ticket_role').setLabel("Roles").setEmoji("📌")
          const allbuttons = [button_close, button_delete, button_transcript, button_user, button_role]
          let ticketroles = ticket.adminroles.map(r=>`<@&${r}>`);
          ch.send({
            content: `<@${user.id}> ${ticketroles.length > 0 ? "| " + ticketroles.join(" / ") : ""}`,
            embed: ticketembed,
            buttons: allbuttons
          }).catch((O) => {}).then(msg => { msg.pin().catch((O) => {}) })

        try {
          var cat = reaction.message.guild.channels.cache.get(ticket.parentid)
          ch.setParent(cat.id).catch((O) => {})
        } catch {
          if (reaction.message.channel.parent) ch.setParent(reaction.message.channel.parent.id).catch((O) => {})
        }
        ch.updateOverwrite(reaction.message.guild.roles.everyone, { //disabling all roles
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        }).catch((O) => {})
        ch.updateOverwrite(reaction.message.guild.id, { //disabling all roles
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        }).catch((O) => {})
        ch.updateOverwrite(user, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        }).catch((O) => {})
      })
    }


  })

  client.on("clickButton", async (button) => {
    if (button.message.author.id != client.user.id) return
    if (!button.id.includes("create_a_ticket")) return
    let guild = button.message.guild;
    let channel = button.message.channel;
    let user = button.clicker.user;
    let ticket = client.setups.get(guild.id, "ticketsystem2");
    //if invalid return
    if(guild.id !== ticket.guildid || button.message.id !== ticket.messageid) return;

    if (client.setups.get("TICKETS", "tickets2").includes(user.id)) {
      try {
        var ticketchannel = guild.channels.cache.get(client.setups.get(user.id, "ticketid2"))
        if (!ticketchannel || ticketchannel == null || !ticketchannel.id || ticketchannel.id == null) throw {
          message: "NO TICKET CHANNEL FOUND AKA NO ANTISPAM"
        }
        return button.reply.send(`<:no:833101993668771842> **You already have an Ticket!** <#${client.setups.get(user.id, "ticketid2")}>`, true);
      } catch {
        client.setups.remove("TICKETS", user.id, "tickets2")
      }

    }

    let channelname = `ticket-${user.username}`.replace(" ", "-").substr(0, 31);

    guild.channels.create(channelname.substr(0, 31), {
      topic: `ticket-${user.id}`
    }).then(ch => {
      button.reply.send(`<a:yes:833101995723194437> **Your Ticket is created!** <#${ch.id}>`, true);
      if (guild.roles.cache.some(r => ticket.adminroles.includes(r.id))) {
        for (let i = 0; i < ticket.adminroles.length; i++) {
          try {
            ch.updateOverwrite(ticket.adminroles[i], { //ticket support role id
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true,
            });
          } catch (error) {
            console.log(error.stack)
          }
        }
      }
      let es = client.settings.get(guild.id, "embed")
      client.setups.push("TICKETS", user.id, "tickets2");
      client.setups.push("TICKETS", ch.id, "tickets2");
      client.setups.set(user.id, ch.id, "ticketid2");
      client.setups.set(ch.id, {
        user: user.id,
        channel: ch.id,
        guild: guild.id,
        type: "ticket-setup-2",
        state: "open",
        date: Date.now(),
      }, "ticketdata");

      var ticketembed = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(`To close/manage this ticket type: ${client.settings.get(guild.id, "prefix")}ticket`, es.footericon)

        .setAuthor(`Ticket for: ${user.tag}`, user.displayAvatarURL({
          dynamic: true
        }), "https://discord.gg/FQGXbypRf8")
        .setDescription(ticket.message.replace("{user}", `${user}`))

        const { MessageButton } = require('discord-buttons')
          let button_close = new MessageButton().setStyle('red').setID('ticket_close').setLabel('Close').setEmoji("🔒")
          let button_delete = new MessageButton().setStyle('grey').setID('ticket_delete').setLabel("Delete").setEmoji("🗑️")
          let button_transcript = new MessageButton().setStyle('blurple').setID('ticket_transcript').setLabel("Transcript").setEmoji("📑")
          let button_user = new MessageButton().setStyle('green').setID('ticket_user').setLabel("Users").setEmoji("👤")
          let button_role = new MessageButton().setStyle('green').setID('ticket_role').setLabel("Roles").setEmoji("📌")
          const allbuttons = [button_close, button_delete, button_transcript, button_user, button_role]
          let ticketroles = ticket.adminroles.map(r=>`<@&${r}>`);
          ch.send({
            content: `<@${user.id}> ${ticketroles.length > 0 ? "| " + ticketroles.join(" / ") : ""}`,
            embed: ticketembed,
            buttons: allbuttons
          }).catch((O) => {}).then(msg => { msg.pin().catch((O) => {}) })

      try {
        var cat = guild.channels.cache.get(ticket.parentid)
        ch.setParent(cat.id).catch((O) => {})
      } catch {
        if (reaction.message.channel.parent) ch.setParent(reaction.message.channel.parent.id).catch((O) => {})
      }
      ch.updateOverwrite(guild.roles.everyone, { //disabling all roles
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
      }).catch((O) => {})
      ch.updateOverwrite(guild.id, { //disabling all roles
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
      }).catch((O) => {})
      ch.updateOverwrite(user, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
      }).catch((O) => {})
    })

  });
}
