const {
    MessageEmbed, Collection, MessageAttachment
  } = require("discord.js");
  const Discord = require("discord.js");
  const config = require("../botconfig/config.json");
  var ee = require("../botconfig/embed.json");
  const moment = require("moment")
  const officegen = require('officegen')
  const fs = require('fs')
  const { MessageButton, MessageActionRow } = require('discord-buttons')
  const {
    databasing, delay, create_transcript, GetUser, GetRole
  } = require("../handlers/functions");

module.exports = client => {
    //Event
    client.on("clickButton", async (button) => {
        if(button.message.author.id != client.user.id) return;
        if(!button.id.includes("ticket_")) return;
        let temptype = button.id.replace("ticket_", "")
        console.log(temptype)
        let guild = button.message.guild;
        let channel = button.message.channel;
        let user = button.clicker.user;
        let buttonuser = user;
        let member = guild.members.cache.get(user.id);
        if(!member) member = await guild.members.fetch(user.id).catch((e)=>{
            return button.reply.send("You are not allowed to execute this command | I can't find you...")
        });
        if(!member)return button.reply.send("You are not allowed to execute this command | I can't find you...")
        
        button.reply.defer();
        
        let adminroles = client.settings.get(guild.id, "adminroles")
        let cmdroles = client.settings.get(guild.id, "cmdadminroles.ticket")
        let cmdroles2 = client.settings.get(guild.id, "cmdadminroles.close")
        let es = client.settings.get(guild.id, "embed");
        try{for (const r of cmdroles2) cmdrole.push(r)}catch{}
        
        let ticket = client.setups.get(guild.id, "ticketsystem")
        var cmdrole = []
            if(cmdroles.length > 0){
            for(const r of cmdroles){
                if(guild.roles.cache.get(r)){
                cmdrole.push(` | <@&${r}>`)
                }
                else if(guild.members.cache.get(r)){
                cmdrole.push(` | <@${r}>`)
                }
                else {
                try{ client.settings.remove(guild.id, r, `cmdadminroles.ticket`) }catch{ }
                try{ client.settings.remove(guild.id, r, `cmdadminroles.close`) }catch{ }
                }
            }
            }
        if ((member.roles.cache.array() && !member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(button.clicker.user.id) && (member.roles.cache.array() && !member.roles.cache.some(r => adminroles.includes(r.id))) && !Array(guild.owner.id, config.ownerid).includes(button.clicker.user.id) && !member.hasPermission("ADMINISTRATOR") && !member.roles.cache.some(r => ticket.adminroles.includes(r.id)))
            return channel.send({content: `${buttonuser}`,embed:new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> You are not allowed to close a Ticket`)
            .setDescription(`${adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(role => `<@&${role}>`).join(" | ") + cmdrole.join(" | ") + ticket.adminroles.join(" | ")  : `No Admin Roles Setupped yet! Do it with: \`${prefix}setup-admin\` You can also add Ticket only Roles with \`${prefix}setup-ticket\``}`)
            }, true);
            let edited = false;
            if(temptype == "close"){
            let data = client.setups.get(channel.id, "ticketdata");
            if(data.state == "closed") {
                return channel.send({content: `${buttonuser}`,embed:new Discord.MessageEmbed()
                .setTitle("<:no:833101993668771842> This Channel is already closed")
                .setColor(es.wrongcolor)})
            }
            let button_ticket_verify = new MessageButton().setStyle('green').setID('ticket_verify').setLabel("Verify this Step").setEmoji("833101995723194437")
            channel.send({content: `${buttonuser}`,embed: new Discord.MessageEmbed()
                .setTitle("Verify the step to close the ticket!")
                .setColor(es.color)
            , buttons: [button_ticket_verify]}).then(async msg=>{
                const collector = msg.createButtonCollector(bb => !bb.clicker.user.bot, { time: 30000 }); //collector for 5 seconds
                collector.on('collect', async b => {
                    if(b.clicker.user.id !== user.id)
                        return b.reply.send(`:x: **Only the one who typed ${prefix}help is allowed to react!**`, true)
                    
                        //page forward
                        if(b.id == "ticket_verify") {
                        
                        if(data.type == "ticket-setup-1"){
                        client.setups.remove("TICKETS", data.user, "tickets");
                        } else if(data.type == "ticket-setup-2"){
                        client.setups.remove("TICKETS", data.user, "tickets2");
                        }else if(data.type == "ticket-setup-3"){
                        client.setups.remove("TICKETS", data.user, "tickets3");
                        }else if(data.type == "ticket-setup-4"){
                        client.setups.remove("TICKETS", data.user, "tickets4");
                        } else if(data.type == "ticket-setup-5"){ 
                        client.setups.remove("TICKETS", data.user, "tickets5");
                        }else if(data.type == "ticket-setup-apply-1"){ 
                        client.setups.remove("TICKETS", data.user, "applytickets1");
                        }else if(data.type == "ticket-setup-apply-2"){ 
                            client.setups.remove("TICKETS", data.user, "applytickets2");
                        }else if(data.type == "ticket-setup-apply-3"){ 
                            client.setups.remove("TICKETS", data.user, "applytickets3");
                        }else if(data.type == "ticket-setup-apply-4"){ 
                            client.setups.remove("TICKETS", data.user, "applytickets4");
                        }else if(data.type == "ticket-setup-apply-5"){ 
                            client.setups.remove("TICKETS", data.user, "applytickets5");
                        }
                        client.setups.set(msg.channel.id, "closed", "ticketdata.state");
                        data = client.setups.get(msg.channel.id, "ticketdata");
                        await msg.channel.updateOverwrite(data.user, {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false,
                        });
                        msg.channel.send({content: `${buttonuser}`,embed:new Discord.MessageEmbed()
                            .setTitle("✅ Success!")
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setDescription(`Closed the Ticket of <@${data.user}> and removed him from the Channel!`.substr(0, 2000))
                            .addField("User: ", `<@${data.user}>`)
                            .addField("Created at: ", `${moment(data.date).format("DD/MM/YYYY | hh:mm:ss")}`)
                            .addField("State: ", `${data.state}`)
                            .setFooter(es.footertext, es.footericon)})
                        if (client.settings.get(guild.id, `adminlog`) != "no") {
                                try {
                                    var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                                    if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                                    adminchannel.send({embed:new MessageEmbed()
                                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                    .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                                        dynamic: true
                                    }))
                                    .setDescription(`\`\`\`${String("ticket").substr(0, 2000)}\`\`\``)
                                    .addField(`Executed in: `, `<#${channel.id}> \`${channel.name}\``)
                                    .addField(`Executed by: `, `<@${user.id}> (${user.tag})\n\`${user.tag}\``)
                                    .setTimestamp().setFooter("ID: " + user.id)
                                })
                                } catch (e) {
                                    console.log(e)
                                }
                        }
                        }
                });
                let endedembed = new Discord.MessageEmbed()
                    .setTitle("The Time to verify this Step has ended!")
                    .setColor(es.wrongcolor)
                collector.on('end', collected => {
                    edited = true;
                    msg.edit({content: `${buttonuser}`,embed: endedembed, buttons: [button_ticket_verify.setDisabled(true).setLabel("FAILED TO VERIFY").setEmoji("833101993668771842").setStyle("red")]})
                });
                setTimeout(()=>{
                    if(!edited)
                    msg.edit({content: `${buttonuser}`,embed: endedembed, buttons: [button_ticket_verify.setDisabled(true).setLabel("FAILED TO VERIFY").setEmoji("833101993668771842").setStyle("red")]})
                }, 30000 + 150)
            })
            }
            else if(temptype == "delete"){
            let button_ticket_verify = new MessageButton().setStyle('green').setID('ticket_verify').setLabel("Verify this Step").setEmoji("833101995723194437")
            let msg = await channel.send({content: `${buttonuser}`,embed:new Discord.MessageEmbed()
            .setTitle("Verify the step to close the ticket!")
            .setColor(es.color)
            , buttons: [button_ticket_verify]})
            const collector = msg.createButtonCollector(bb => !bb.clicker.user.bot, { time: 30000 }); //collector for 5 seconds
            collector.on('collect', async b => {
                if(b.clicker.user.id !== user.id)
                    return b.reply.send(`:x: **Only the one who typed ${prefix}help is allowed to react!**`, true)
                
                    //page forward
                    if(b.id == "ticket_verify") {
                    let data = client.setups.get(msg.channel.id, "ticketdata");
                    if(data.type == "ticket-setup-1"){
                        client.setups.remove("TICKETS", data.user, "tickets");
                        client.setups.remove("TICKETS", data.channel, "tickets");
                    } else if(data.type == "ticket-setup-2"){
                        client.setups.remove("TICKETS", data.user, "tickets2");
                        client.setups.remove("TICKETS", data.channel, "tickets2");
                    }else if(data.type == "ticket-setup-3"){
                        client.setups.remove("TICKETS", data.user, "tickets3");
                        client.setups.remove("TICKETS", data.channel, "tickets3");
                    }else if(data.type == "ticket-setup-4"){
                        client.setups.remove("TICKETS", data.user, "tickets4");
                        client.setups.remove("TICKETS", data.channel, "tickets4");
                    } else if(data.type == "ticket-setup-5"){
                        client.setups.remove("TICKETS", data.user, "tickets5");
                        client.setups.remove("TICKETS", data.channel, "tickets5");
                    } else if(data.type == "ticket-setup-apply-1"){ 
                        client.setups.remove("TICKETS", data.user, "applytickets1");
                        client.setups.remove("TICKETS", data.channel, "tickets5");
                    }else if(data.type == "ticket-setup-apply-2"){ 
                        client.setups.remove("TICKETS", data.user, "applytickets2");
                        client.setups.remove("TICKETS", data.channel, "applytickets2");
                    }else if(data.type == "ticket-setup-apply-3"){ 
                        client.setups.remove("TICKETS", data.user, "applytickets3");
                        client.setups.remove("TICKETS", data.channel, "applytickets3");
                    }else if(data.type == "ticket-setup-apply-4"){ 
                        client.setups.remove("TICKETS", data.user, "applytickets4");
                        client.setups.remove("TICKETS", data.channel, "applytickets4");
                    }else if(data.type == "ticket-setup-apply-5"){ 
                        client.setups.remove("TICKETS", data.user, "applytickets5");
                        client.setups.remove("TICKETS", data.channel, "applytickets5");
                    }
                    try{
                    client.setups.delete(msg.channel.id);
                    }catch{
    
                    }
                    msg.channel.delete({timeout: 3500}).catch(e=>{console.log(e)})
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle("✅ Success!")
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`Deleting Ticket in less then **\`3 Seconds\`** ....\n\n*If not you can do it manually*`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon))
                    if (client.settings.get(guild.id, `adminlog`) != "no") {
                            try {
                                var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                                if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                                adminchannel.send({embed:new MessageEmbed()
                                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                                    dynamic: true
                                }))
                                .setDescription(`\`\`\`${String("ticket").substr(0, 2000)}\`\`\``)
                                .addField(`Executed in: `, `<#${channel.id}> \`${channel.name}\``)
                                .addField(`Executed by: `, `<@${user.id}> (${user.tag})\n\`${user.tag}\``)
                                .setTimestamp().setFooter("ID: " + user.id)
                            })
                            } catch (e) {
                                console.log(e)
                            }
                    }
                    }
            });
            let endedembed = new Discord.MessageEmbed()
                .setTitle("The Time to verify this Step has ended!")
                .setColor(es.wrongcolor)
            collector.on('end', collected => {
                edited = true;
                msg.edit({content: `${buttonuser}`,embed: endedembed, buttons: [button_ticket_verify.setDisabled(true).setLabel("FAILED TO VERIFY").setEmoji("833101993668771842").setStyle("red")]})
            });
            setTimeout(()=>{
                if(!edited)
                msg.edit({content: `${buttonuser}`,embed: endedembed, buttons: [button_ticket_verify.setDisabled(true).setLabel("FAILED TO VERIFY").setEmoji("833101993668771842").setStyle("red")]})
            }, 30000 + 150)
            } 
            else if(temptype == "log" || temptype == "transcript"){
            msglimit = 1000;
            let data = client.setups.get(channel.id, "ticketdata");
            //do transcripting - making a docx file with design. Here the Docs: https://github.com/Ziv-Barber/officegen/blob/4bfff80e0915f884199495c0ea64e5a0f0549cfe/manual/docx/README.md#prgapi
            let tmmpmsg = await channel.send({content: `${buttonuser}`,embed:new MessageEmbed().setAuthor("Transcripting...", "https://cdn.discordapp.com/emojis/757632044632375386.gif?v=1")})
            let docx = officegen({
                type: 'docx',
                author: client.user.username,
                creator: client.user.username,
                description: `Transcript for the Channel #${channel.name} with the ID: ${channel.id}`,
                pageMargins: {
                top: 1000,
                right: 1000,
                bottom: 1000,
                left: 1000
                },
                title: `Transcript!`
            })
            //Logs when to File Got CREATED   =  This does NOT mean that it is finished putting the text in!
            docx.on('finalize', function (written) {})
            //if an error occurs then stop
            docx.on('error', function (err) {
                console.log(err);
                return channel.send(err.substr(0, 2000), {code: "js"});
            })
            //The "TITLE" 
            pObj = docx.createP() //Make a new paragraph
            pObj.options.align = 'left'; //align it to the left page
            pObj.options.indentLeft = -350; //overdrive it 350px to the left
            pObj.options.indentFirstLine = -250; //go 250 px to the - left so right of the overdrive
            pObj.addText('Transcript for:    #' + channel.name, {
                font_face: 'Arial',
                color: '3c5c63',
                bold: true,
                font_size: 22
            }); //add the TEXT CHANNEL NAME
            pObj.addLineBreak() //make a new LINE
            pObj.addText("Channelid: " + channel.id, {
                font_face: 'Arial',
                color: '000000',
                bold: false,
                font_size: 10
            }); //Channel id
            pObj.addLineBreak() //Make a new LINE
            pObj.addText(`Oldest message at the BOTTOM `, {
                hyperlink: 'myBookmark',
                font_face: 'Arial',
                color: '5dbcd2',
                italic: true,
                font_size: 8
            }); //Make a hyperlink to the BOOKMARK (Created later)
            pObj.addText(`  [CLICK HERE TO JUMP]`, {
                hyperlink: 'myBookmark',
                font_face: 'Arial',
                color: '1979a9',
                italic: false,
                bold: true,
                font_size: 8
            }); //Make a hyperlink to the BOOKMARK (Created later)
            pObj.addLineBreak() //Make a new Line
            //The text content collection
            let messageCollection = new Collection(); //make a new collection
            let channelMessages = await channel.messages.fetch({ //fetch the last 100 messages
                limit: 100
            }).catch(err => console.log(err)); //catch any error
            messageCollection = messageCollection.concat(channelMessages); //add them to the Collection
            let tomanymsgs = 1; //some calculation for the messagelimit
            if (Number(msglimit) === 0) msglimit = 100; //if its 0 set it to 100
            let messagelimit = Number(msglimit) / 100; //devide it by 100 to get a counter
            if (messagelimit < 1) messagelimit = 1; //set the counter to 1 if its under 1
            while (channelMessages.size === 100) { //make a loop if there are more then 100 messages in this channel to fetch
                if (tomanymsgs === messagelimit) break; //if the counter equals to the limit stop the loop
                tomanymsgs += 1; //add 1 to the counter
                let lastMessageId = channelMessages.lastKey(); //get key of the already fetched messages above
                channelMessages = await channel.messages.fetch({
                limit: 100,
                before: lastMessageId
                }).catch(err => console.log(err)); //Fetch again, 100 messages above the already fetched messages
                if (channelMessages) //if its true
                messageCollection = messageCollection.concat(channelMessages); //add them to the collection
            }
            let msgs = messageCollection.array().reverse(); //reverse the array to have it listed like the discord chat
            //now for every message in the array make a new paragraph!
            await msgs.forEach(async msg => {
                // Create a new paragraph:
                pObj = docx.createP()
                pObj.options.align = 'left'; //Also 'right' or 'justify'.
                //Username and Date
                pObj.addText(`${msg.author.tag}`, {
                font_face: 'Arial',
                color: '3c5c63',
                bold: true,
                font_size: 14
                });
                pObj.addText(`  |  ${msg.createdAt.toDateString()}  |  ${msg.createdAt.toLocaleTimeString()}`, {
                font_face: 'Arial',
                color: '3c5c63',
                bold: true,
                font_size: 14
                }); //
                //LINEBREAK
                pObj.addLineBreak()
                //message of user     
                let umsg;

                if (msg.content.startsWith("```")) {
                umsg = msg.content.replace(/```/g, "");
                } else if (msg.attachments.size > 0) {
                umsg = "Unable to transcript (Embed/Video/Audio/etc.)";
                } else {
                umsg = msg.content;
                }
                pObj.addText(umsg, {
                font_face: 'Arial',
                color: '000000',
                bold: false,
                font_size: 10
                });
                //LINEBREAK
                pObj.addLineBreak()
                pObj.addText(`______________________________________________________________________________________________________________________________________________________________________________________________________________`, {
                color: 'a6a6a6',
                font_size: 4
                });

            });
            // Start somewhere a bookmark:
            pObj.startBookmark('myBookmark'); //add a bookmark at tha last message to make the jump 
            pObj.endBookmark();
            let out = fs.createWriteStream(`${channel.name}.docx`) //write everything in the docx file
            //if a error happens tells it
            out.on('error', function (err) {
                console.log(err)
            })
            //wenn the writing is finished
            out.on("finish", async function (err, result) {
                await delay(3000);
            })
            // Async call to generate the output file:
            await docx.generate(out)
            await delay(2000);
            try { // try to send the file
                const buffer = fs.readFileSync(`./${channel.name}.docx`); //get a buffer file
                const attachment = new MessageAttachment(buffer, `./${channel.name}.docx`); //send it as an attachment
                //send the Transcript Into the Channel and then Deleting it again from the FOLDER
                let sendembed = new MessageEmbed()
                .setTitle(`Log for Ticket-Channel: \`#${channel.name}\``)
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                
                try {
                let user = guild.members.cache.get(data.user)
                sendembed.setDescription(`${user.user}\n**\`${user.user.username}#${user.user.discriminator}\`**\n**\`(${user.user.id})\`**`)
                sendembed.setThumbnail(user.user.displayAvatarURL({
                    dynamic: true
                }))
        
                } catch {
                sendembed.setDescription(channel.topic)
                }
                await channel.send({content: `${buttonuser}`,embed:sendembed})
                await channel.send(attachment)
                await tmmpmsg.delete().catch(e=>console.log(e))
                await fs.unlinkSync(`./${channel.name}.docx`)
                if (client.settings.get(guild.id, `adminlog`) != "no") {
                try {
                    var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                    if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                    adminchannel.send(new MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                    .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`\`\`\`${String("ticket").substr(0, 2000)}\`\`\``)
                    .addField(`Executed in: `, `<#${channel.id}> \`${channel.name}\``)
                    .addField(`Executed by: `, `<@${user.id}> (${user.tag})\n\`${user.tag}\``)
                    .setTimestamp().setFooter("ID: " + user.id)
                    )
                } catch (e) {
                    console.log(e)
                }
                }
            } catch (error) { //if the file is to big to be sent, then catch it!
            console.log(error)
            channel.send({content: `${buttonuser}`,embed:new MessageEmbed().setAuthor("ERROR! Transcript is to big, to be sent into the Channel!",user.displayAvatarURL({
                dynamic: true
            })).setFooter("Smaller the maximum amount of Messages!")})
            fs.unlinkSync(`./${channel.name}.docx`) //delete the docx
            }
            }
            else if(temptype == "user"){
            channel.send({content: `${buttonuser}`,embed:new Discord.MessageEmbed()
                .setTitle("Please ping the User you want to add/remove")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Either with <@USERID> or with the USERNAME, or with the USERID`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
            }).then(async msg=>{
                msg.channel.awaitMessages(m=>m.author.id === buttonuser.id, {max: 1, time: 90000, errors: ["time"]}).then(async collected=>{
                var message = collected.first();
                var args = message.content.split(" ")
                var user;
                    try{
                        user = await GetUser(message, args)
                    }catch (e){
                    if(!e) return channel.send("UNABLE TO FIND THE USER")
                    return channel.send(e)
                    }
                if(!user || user == null || user.id == null || !user.id) channel.send("<:no:833101993668771842> Could not find the USER")
                var mapped = msg.channel.permissionOverwrites.map(p => {
                    if(p.type == "member"){
                    var obj = {id: "", allow: []};
                    obj.id = p.id;
                    obj.allow = p.allow ? p.allow.toArray() : []
                    return obj;
                    }
                    else{
                    return {id: "", allow: []};
                    }
                })
                var oldmapped = mapped;
                var undermapped = mapped.map(p=> p.id)
                if(undermapped.includes(user.id)){
                    oldmapped.forEach((element) => {
                        if(element.id == user.id){
                        if(!element.allow.includes("VIEW_CHANNEL")){
                            channel.updateOverwrite(user.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            }).then(channel => {
                            channel.send({content: `${buttonuser}`,embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(`SUCCESS | Added \`${user.tag}\` to the TICKET`)
                            })
                            if (client.settings.get(guild.id, `adminlog`) != "no") {
                                try {
                                    var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                                    if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                                    adminchannel.send({embed:new MessageEmbed()
                                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                    .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                                        dynamic: true
                                    }))
                                    .setDescription(`\`\`\`${String("ticket").substr(0, 2000)}\`\`\``)
                                    .addField(`Executed in: `, `<#${channel.id}> \`${channel.name}\``)
                                    .addField(`Executed by: `, `<@${user.id}> (${user.tag})\n\`${user.tag}\``)
                                    .setTimestamp().setFooter("ID: " + user.id)
                                    })
                                } catch (e) {
                                    console.log(e)
                                }
                                }
                            })
                            .catch(e=>{
                            return channel.send(new MessageEmbed()
                                .setColor(es.wrongcolor)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(`<:no:833101993668771842> An error occurred`)
                                .setDescription(`\`\`\`${e.stack}\`\`\``)
                            );
                            });
                        }else {
                            channel.updateOverwrite(user.id, {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false,
                            }).then(channel => {
                            return channel.send({content: `${buttonuser}`,embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(`SUCCESS | REMOVED \`${user.tag}\` from the TICKET`)
                            })
                            })
                            .catch(e=>{
                            return channel.send(new MessageEmbed()
                                .setColor(es.wrongcolor)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(`<:no:833101993668771842> An error occurred`)
                                .setDescription(`\`\`\`${e.stack}\`\`\``)
                            );
                            });
                        }
                        }
                    });
                }else{
                    channel.updateOverwrite(user.id, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true,
                    }).then(channel => {
                    channel.send({content: `${buttonuser}`,embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle(`SUCCESS | Added \`${user.tag}\` to the TICKET`)
                    })
                    if (client.settings.get(guild.id, `adminlog`) != "no") {
                        try {
                            var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                            if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                            adminchannel.send(new MessageEmbed()
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                            .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(`\`\`\`${String("ticket").substr(0, 2000)}\`\`\``)
                            .addField(`Executed in: `, `<#${channel.id}> \`${channel.name}\``)
                            .addField(`Executed by: `, `<@${user.id}> (${user.tag})\n\`${user.tag}\``)
                            .setTimestamp().setFooter("ID: " + user.id)
                            )
                        } catch (e) {
                            console.log(e)
                        }
                        }
                    })
                    .catch(e=>{
                    return channel.send(new MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle(`<:no:833101993668771842> An error occurred`)
                        .setDescription(`\`\`\`${e.stack}\`\`\``)
                    );
                    });
                }
                }).catch(e=>{
                console.log(e)
                return channel.send({content: `${buttonuser}`,embed:new Discord.MessageEmbed()
                    .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                    .setColor(es.wrongcolor)
                    .setDescription(`"Cancelled"`.substr(0, 2000))
                    .setFooter(es.footertext, es.footericon)
                });
                })
            })
            }
            else if(temptype == "role"){
            channel.send({content: `${buttonuser}`,embed:new Discord.MessageEmbed()
                .setTitle("Please ping the ROLE you want to add/remove")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Either with <@&ROLEID> or with the ROLEID or with the ROLENAME`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
            }).then(async msg=>{
                msg.channel.awaitMessages(m=>m.author.id === buttonuser.id, {max: 1, time: 90000, errors: ["time"]}).then(async collected=>{
                var message = collected.first();
                var args = message.content.split(" ")
                var user;
                    try{
                        user = await GetRole(message, args)
                    }catch (e){
                    if(!e) return channel.send("UNABLE TO FIND THE ROLE")
                    return channel.send("ERROR" + e)
                    }
                if(!user || user == null || user.id == null || !user.id) channel.send("<:no:833101993668771842> Could not find the ROLE")
                var mapped = msg.channel.permissionOverwrites.map(p => {
                    if(p.type == "role"){
                    var obj = {id: "", allow: []};
                    obj.id = p.id;
                    obj.allow = p.allow ? p.allow.toArray() : []
                    return obj;
                    }
                    else{
                    return {id: "", allow: []};
                    }
                })
                var oldmapped = mapped;
                var undermapped = mapped.map(p=> p.id)
                if(undermapped.includes(user.id)){
                    oldmapped.forEach((element) => {
                        if(element.id == user.id){
                        console.log(element)
                        if(!element.allow.includes("VIEW_CHANNEL")){
                            channel.updateOverwrite(user.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            }).then(channel => {
                            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(`SUCCESS | Added \`@${user.name}\` to the TICKET`)
                            )
                            if (client.settings.get(guild.id, `adminlog`) != "no") {
                                try {
                                    var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                                    if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                                    adminchannel.send(new MessageEmbed()
                                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                    .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                                        dynamic: true
                                    }))
                                    .setDescription(`\`\`\`${String("ticket").substr(0, 2000)}\`\`\``)
                                    .addField(`Executed in: `, `<#${channel.id}> \`${channel.name}\``)
                                    .addField(`Executed by: `, `<@${user.id}> (${user.tag})\n\`${user.tag}\``)
                                    .setTimestamp().setFooter("ID: " + user.id)
                                    )
                                } catch (e) {
                                    console.log(e)
                                }
                                }
                            })
                            .catch(e=>{
                            return channel.send(new MessageEmbed()
                                .setColor(es.wrongcolor)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(`<:no:833101993668771842> An error occurred`)
                                .setDescription(`\`\`\`${e.stack}\`\`\``)
                            );
                            });
                        }else {
                            channel.updateOverwrite(user.id, {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false,
                            }).then(channel => {
                            return channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(`SUCCESS | REMOVED \`@${user.name}\` from the TICKET`)
                            )
                            })
                            .catch(e=>{
                            return channel.send(new MessageEmbed()
                                .setColor(es.wrongcolor)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(`<:no:833101993668771842> An error occurred`)
                                .setDescription(`\`\`\`${e.stack}\`\`\``)
                            );
                            });
                        }
                        }
                    });
                }else{
                    channel.updateOverwrite(user.id, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true,
                    }).then(channel => {
                    channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle(`SUCCESS | Added \`@${user.name}\` to the TICKET`)
                    )
                    if (client.settings.get(guild.id, `adminlog`) != "no") {
                        try {
                            var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                            if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                            adminchannel.send(new MessageEmbed()
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                            .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(`\`\`\`${String("ticket").substr(0, 2000)}\`\`\``)
                            .addField(`Executed in: `, `<#${channel.id}> \`${channel.name}\``)
                            .addField(`Executed by: `, `<@${user.id}> (${user.tag})\n\`${user.tag}\``)
                            .setTimestamp().setFooter("ID: " + user.id)
                            )
                        } catch (e) {
                            console.log(e)
                        }
                        }
                    })
                    .catch(e=>{
                    return channel.send(new MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle(`<:no:833101993668771842> An error occurred`)
                        .setDescription(`\`\`\`${e.stack}\`\`\``)
                    );
                    });
                }
                }).catch(e=>{
                console.log(e)
                return channel.send({content: `${buttonuser}`,embed:new Discord.MessageEmbed()
                    .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                    .setColor(es.wrongcolor)
                    .setDescription(`"Cancelled"`.substr(0, 2000))
                    .setFooter(es.footertext, es.footericon)
                });
                })
            })
            }
    });
}