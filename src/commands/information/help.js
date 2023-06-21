const Discord = require('discord.js');
const settings = require('../../config/settings.js');

module.exports = {

	name: 'help',
	description: 'Shows you my commands',
    notSlash: true,
	async execute(fox, stuff) {

        // Defines the client
        const client = fox.client
        const config = settings
        

        // Function for making page contents
        async function getPage(module) {

            let modcommands = []

            // Loops over the commands and added all the commands from the defined module into the array. Note other filters might be added here later.
            for (const command of [...client.commands.values()].filter(comm => comm.module === module)) {
                modcommands.push(command)                
            }

            // Define and create the description for every command 
            let desc = ""
            modcommands.forEach(comm => desc += (`\`${stuff.prefix}${comm.name} ${(comm.usage) ? comm.usage : ""}\`\n${(comm.description) ? `${settings.space}${comm.description}\n`: ""}`))
            
            // Defines the embed that is then passed back
            const embed = new Discord.EmbedBuilder()
            .setTitle(`${module} commands`)
            .setColor(settings.green)
            .setDescription(desc)
            return embed
        }


        // Defines the starting help/home embed
        const help = new Discord.EmbedBuilder()
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048}))
            .setTitle("FurBot help")
            .setDescription(`FurBots prefix is \`${stuff.prefix}\`\n${settings.space}You can view my source code on [github](${config.github}).\n\n\`Information\`\n${settings.space}Shows all of the information commands\n\`Actions\`\n${settings.space}Shows all of the action commands`)
            .setColor(settings.green)



            // Defines the setting menu
            let menu =  {
                type: 3,
                customId: "menu",
                placeholder: "Select a category",
                options: [{ label: 'Information', value: 'information' }, { label: 'Actions', value: 'actions' }, { label: 'Useful', value: 'useful' }]
            }



            // Defines the buttons
            const buttons = [
                { label: 'Home', style: Discord.ButtonStyle.Secondary, type: 2, customId: 'home' },
                { label: 'Close', style: Discord.ButtonStyle.Danger, type: 2, customId: 'close' }
            ]


            // Send the embed and components
            const message = await fox.reply({ embeds: [help], components: [{type: 1, components: [menu]}, {type: 1, components: buttons}]})


            // Create the collection for the help command
            const filter = (interaction) =>  ['menu', 'home', 'close'].includes(interaction.customId) && interaction.user.id === fox.author.id
            const collector = message.createMessageComponentCollector({ filter, idle: 90000 });


            // When the collector wakes up!!!
            collector.on('collect', async (i) => {

                let request = i.customId
                // If interaction is from the select menu change it to be its value
                if (request === "menu") request = i.values[0]

        
                // If the button close is hit delete the message and react
                if (request === "close") {

                    collector.stop('skip_edit')
                    await message.delete()
                    await fox.react("👌")
                }

                // If home
                else if (request === "home") {
                    await i.update({ embeds: [help] })
                }
                

                // Is a menu (so looking at a category)
                else await i.update({ embeds: [await getPage(request)] })

        }, 'collector-collect')

        // Triggers when the collector needs to go to sleep
        collector.on('end', async (collected, reason) => {

            // If the close button was not hit and the menu timed out then remove the components
            if (reason !== "skip_edit") return await message.edit({ components: [] })
        })
	},
};