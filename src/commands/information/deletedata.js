const config = require("../../config/settings.js");
const Discord = require('discord.js');
const settings = require('../../config/settings.js');
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'deletedata',
	description: 'Lets you delete your user data (if any)',
    // 0 = Install as a guild command, 1 = Install as a user command
    integration_types: [0, 1],
    // 0 = Allow command to be run in guilds, 1 = Allow commands to be used in bot dms, 2 = Allow commands to be used in Private Messages
    contexts: [0, 1, 2],
	async execute(fox, stuff, db) {


        // If there is no database
        if (!settings.database) {
            const embed = new Discord.EmbedBuilder()
            .setColor(config.red)
            .setDescription("This instance does not have a database running! There is no data being stored")
            return await fox.reply({embeds: [embed]})
        }

        // Define user id
        let userId = fox.user?.id
        if (!userId) userId = fox.author.id

        // Define the user
        const user = await db.table("users").get(userId).run()

        // If no user data exists return error
        if (!user) {

            const embed = new Discord.EmbedBuilder()
            .setColor(config.red)
            .setDescription("You have no data stored in my database, I can not delete data that does not exist!")
            return fox.reply({embeds: [embed]})
        }


        const confirm = await snip.confirm(fox, "Are you **sure** you want delete your user data? This will delete all of your user action stats, this is not recoverable, are you sure you want to proceed?")

        if (!confirm) return

        await db.table("users").get(userId).delete().run()

        const embed = new Discord.EmbedBuilder()
        .setColor(config.green)
        .setDescription("Okay! All of your user data has been deleted successfully")

        return await confirm.update({embeds: [embed], components: []})

	},
};