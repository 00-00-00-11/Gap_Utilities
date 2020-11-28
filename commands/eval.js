const Discord = require('discord.js');
const error = require("../assets/Error");
let embeds = require('../assets/embeds');

module.exports = {
    help: {
        "name": ">eval",
        "id": "eval",
        "aliases": [
            "test",
            "eval",
            "jseval",
            "jstest"
        ],
        "desc": "A little evaluation command! (Restricted to owner.)",
        "example": ">eval console.log(\"An Example.\")"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message | Discord.PartialMessage} msg
     * @param {string[]} args
     */
    run: async (bot, msg, args) =>
    {
        if ((!(msg.author.id === '728342296696979526')) || (!(require('../whitelist').includes(msg.author.id)))) return msg.channel.send("You are not in the whitelist or you do not have the `ADMINISTRATOR` permission.");

        let raw = msg.content.slice(6);
        if (raw.includes('ipconfig')) return msg.reply('no');
        if (!raw) return msg.reply('you must specify code to execute.');
        let evalOutput;
        try
        {
            evalOutput = (await eval(raw));
        } catch (e) { evalOutput = e; }
        if (`${evalOutput}`.startsWith('[object')) evalOutput = JSON.stringify(evalOutput);
        // try { evalOutput = eval(raw); } catch (e) { msg.reply(e); }
        // if (evalOutput.includes(bot.token)) return msg.reply("oh no you don't!");


        msg.channel.send('Here are your evaluation results!', embeds.eval(raw, evalOutput));

        msg.react('✅');
    }
};;;