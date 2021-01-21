module.exports = async (pages, ctx, { respond }) => {
            let index = 0;
            if (!pages) return;
            let m = respond ? await ctx.respond(pages[index]) : await ctx.message.channel.send(pages[index])
            function up() { m.edit(pages[index]); };
            up();
            ["⏮","◀️","▶️","⏭"].map(v => m.react(v));
            const collector = m.createReactionCollector((r, u) => (u.id === ctx.message.author.id));
            collector.on('collect', (r) =>
            {
                switch (r.emoji.name)
                {
                   
                    case "▶️":
                        index = (index == (pages.length - 1)) ? index : index + 1;
                        up();
                        break;
                    case "◀️":
                        index = index ? index - 1 : index;
                        up();
                        break;
                    case "⏮":
                        index = 0;
                        up();
                        break;
                    case "⏭":
                        index = pages.length - 1;
                        up();
                        break;
                    
                }
            });

}