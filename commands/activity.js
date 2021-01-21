module.exports = {
  run: async (bot, msg, args, db, flags, ctx) =>
    ctx.util.paginate(
      (flags.getObj().solo?.includes("fetch")
          ? await bot.users.fetch(idify(args[1]))
          : bot.users.cache.find((u) =>
              u.id == idify(args[1]) || args[1]
                ? u.username
                    .toLowerCase()
                    .includes(args.slice(1).join(" ")?.toLowerCase())
                : false || u.id == msg.author.id
            ) || msg.author)?.presence.activities?.map(
        (v, i, a) =>
          new ctx.Discord.MessageEmbed({
            description: `**${[
              ...(v.type == "LISTENING"
                ? "LISTENING TO"
                : v.type == "COMPETING"
                ? "COMPETING IN"
                : v.type),
            ]
              .map((v, i) => (i == 0 ? v.toUpperCase() : v.toLowerCase()))
              .join("")
              .replace(/_/g, " ")}** ${
              v.type == "CUSTOM_STATUS" ? "" : v.name + " "
            }`.replace(/ +- +/g, "\n"),
            color: "YELLOW",
            title: `${
              (flags.getObj().solo?.includes("fetch")
          ? await bot.users.fetch(idify(args[1]))
          : bot.users.cache.find((u) =>
              u.id == idify(args[1]) || args[1]
                ? u.username
                    .toLowerCase()
                    .includes(args.slice(1).join(" ")?.toLowerCase())
                : false || u.id == msg.author.id
            ) || msg.author)?.tag
            }'s Presence`,
            footer: { text: `Page ${i + 1} of ${a.length}` },
            image: {
              url: v.emoji
                ? `https://cdn.discordapp.com/emojis/${v.emoji.id}.png?v=1`
                : v.assets
                ? v.assets.largeImageURL()
                : "",
            },
            fields: [
              { name: "Details", value: v.details ?? "None" },
              { name: "State", value: v.state },
              {
                name: "Time elapsed",
                value: require("moment")(v.createdAt)
                  .fromNow()
                  .replace(/ ago/g, ""),
              },
            ],
            thumbnail: { url: v.assets?.smallImageURL() },
          })
      ),
      ctx,
      { respond: false }
    ),

  help: {
    name: ">activity",
    id: "activity",
    aliases: ["act"],
    desc: "Get activìty info about you or another user!",
    example: ">activity",
    whitelisted: false,
    nsfw: false,
  },
};
