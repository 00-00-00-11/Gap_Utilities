
const Discord = require(`discord.js`);
// const { global } = require('node/globals.global');
let embeds = require('../assets/embeds');

module.exports = {
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} msg
     * @param {firebase.default.database.Database} db
     */
    run: async (bot, msg, db) =>
    {
        if ((!msg.guild) || (msg.guild == undefined) || (msg.channel.type === 'dm')) return;
        if (msg.content.includes('(╯°□°）╯︵ ┻━┻') || msg.content.includes('┻━┻︵╰(°□°╰)'))
        {

            msg.channel.send('┬─┬ ノ( ゜-゜ノ)  	');
        }
        // @ts-ignore
        if (!((await db.ref(`settings/${msg.guild.id}`).get()).val())) return;
        // @ts-ignore
        global.settings = require('../settings.json');
        ((...args) =>
        {
            if (!(msg.member === null)) { } else return;
            if (msg.member.displayName.startsWith('[AFK]')) 
            {
                let err = false;
                msg.member.setNickname(msg.member.displayName.slice(6)).catch(e => { err = true; });
                if (!err) msg.channel.send(embeds.afkRemove(msg));
            }
        })``;
        require("../assets/censor.js").run(bot, msg);
        require('../assets/pinged').run(bot, msg);
        // @ts-ignore
        let args = msg.content.slice((require('../settings.json')).settings[msg.guild.id].prefix.length).split(/ +/);
        (function ()
        {
            if (msg.author.bot) return;
            if (msg.content == 'defsettingsforceplz')
            {

                db.ref(`settings/${msg.guild.id}`).set(db.ref('settings/default'));
                // @ts-ignore
                require('fs').writeFileSync('./gap_utilities/settings.json', JSON.stringify(global.settings));;
                msg.reply('default settings applied to this server!');
            } else if (msg.content == 'id') msg.reply(msg.channel.id);
            // @ts-ignore
            if (msg.content.startsWith((require('../settings.json').settings[msg.guild.id].prefix)))
            {
                // @ts-ignore
                if (global.settings.blacklist.includes(msg.author.id)) return msg.channel.send(embeds.blacklisted());
                try
                {
                    // @ts-ignore
                    global.cmds = (require('./commandLoader.js'))(true);
                    // @ts-ignore
                    if (!global.cmds.get(args[0]) || !global.cmds.get(args[0]).run) return;
                    // @ts-ignore
                    try { global.cmds.get(args[0]).run(bot, msg, args, db); }
                    catch (e) { msg.react('❌'); return msg.reply(`An error occurred in the MessageHandler for \`${msg.content}\`: \`\`\`\n${e}\`\`\``); } console.log(`triggered command`);
                } catch (err) { return msg.reply(`An error occurred in the EventHandler for \`message\`: \`\`\`\n${err}\`\`\``); }
            }
        })();
        if (msg.author.discriminator === '0000') return;
        // @ts-ignore
        return console.log(`[MESSAGE] User ${msg.author.username}#${msg.author.discriminator} sent message \`${msg.content}\` ${(msg.guild) ? `in channel '${msg.channel.name}', server '${msg.guild.name}' (ID ${msg.guild.id})}` : `in a DM to ${bot.user.username}.`}`);
    }
};