const config = require("../../config/settings.js");
const Discord = require('discord.js');
const settings = require('../../config/settings.js');
const snip = require("../../scripts/snippets");
const randomColor = require('randomcolor');

module.exports = {

	name: 'stats',
	description: 'Lets you see your action stats or another users if provided',
    options: [{type: 6, name: "user", description: "Select a user to view their stats"}],
	async execute(fox, stuff, db) {


        // If there is no database
        if (!settings.database) {
            const embed = new Discord.EmbedBuilder()
            .setColor(config.red)
            .setDescription("This instance does not have a database running! There is no data being stored")
            return await fox.reply({embeds: [embed]})
        }

        let userId = null

        // Define user id
        if (fox?.options?.data.length) userId = fox.options.data[0].user.id
        else if (stuff.args) userId = stuff.args.id
        else if (stuff.text) userId = fox.author.id
        else userId = fox.user.id

        // Define member, if member doesnt exist return 
        const member = await fox.guild.members.fetch({ user: userId});
        if (!member) {

            const embed = new Discord.EmbedBuilder()
            .setColor(config.red)
            .setDescription("This user is not in the server so I can not see their stats :(")
            return await fox.reply({embeds: [embed]})
        }

        // Fetch user
        let user = await db.table("users").get(userId).run()
        // If no user is found make all their defaults 0
        if (!user) user = snip.getBaseData()

        // Get the action data
        function getActionData (type) {

            let string = `> 🐶 **Barked** ${user[type].bark}x - ${config.bite} **Bit** ${user[type].bite}x - ${config.boop} **Booped** ${user[type].boop}x`
            string = string + `\n> 🍎 **Fed** ${user[type].feed}x - ${config.hug} **Hugged** ${user[type].hug}x - ${config.kiss} **Kissed** ${user[type].kiss}x`
            string = string + `\n> ${config.lick} **Licked** ${user[type].lick}x - 😺 **Meowed** ${user[type].meow}x - ${config.nuzzle} **Nuzzled** ${user[type].nuzzle}x`
            string = string + `\n> ${config.pet} **Petted** ${user[type].pet}x - ${config.poke} **Poked** ${user[type].poke}x - ${config.shoot} **Shot** ${user[type].shoot}x`
            string = string + `\n> ${config.slap} **Slapped** ${user[type].slap}x - 👋 **Spanked** ${user[type].spank}x`
            return string
        }

        // Define and return the message
        const embed = new Discord.EmbedBuilder()
        .setColor(randomColor())
        .setAuthor({ name: `${member.displayName} Action Stats!`, iconURL: member?.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 })})
        .setDescription(`**Actions Given**:\n${getActionData("giving")}\n\n**Actions Received**:\n${getActionData("receiving")}`)
        return await fox.reply({embeds: [embed]})

	},
};