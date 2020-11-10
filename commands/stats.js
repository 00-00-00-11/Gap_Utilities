const Discord = require('discord.js');
const os = require("os");
module.exports = {
    help: {
        "name": ">role",
        "id": "role",
        "aliases": [
            "role"
        ],
        "desc": "Coming Soon!",
        "example": ">stats"
    },
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} msg
     * @param {string[]} args
     */
    run: (bot, msg, args) =>
    {
        let _ = new Discord.MessageEmbed({
            color: "black",
            title: "Stats",
            description: "Statistics.",
            fields: [
                {
                    "name": `OS Type`,
                    value: `${os.type()}`,
                    inline: true
                },
                {
                    name: `OS Arch`,
                    value: `${os.arch()}`,
                    inline: true
                },
                {
                    name: `Free RAM`,
                    value: `${os.freemem() / 125000000} GB`
                },
                {
                    name: `CPUs`,
                    value: `${os.cpus()}`,
                    inline: true
                },
                {
                    name: `OS Platform`,
                    value: `${os.platform()}`
                }
            ]
        });
        msg.channel.send(_);
    }
};;;