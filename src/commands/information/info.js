const Discord = require('discord.js');
const package = require('../../../package.json');
const settings = require('../../config/settings.js');

module.exports = {

	name: 'info',
	description: 'Shows FurBoi statistics and how to contact the FurBoi owner',
	async execute(fox, stuff) {

		// Defines the owner
		const owner = await stuff.client.users.fetch(settings.ownerID)
		// I am lazy
		const client = stuff.client

		const embed = new Discord.EmbedBuilder()
		.setColor(settings.green)
		.setAuthor({name: `${client.user.username} Info`, iconURL: client.user.avatarURL({ format: 'png', dynamic: true}), url: package.homepage})
		.setDescription(`Hey there! These are my stats${(settings.slash) ? " c:" : `, to see all of my commands use \`${stuff.prefix}help\``}`)
		.addFields(
			{ name: '🕵️ Owner:', value: `[${owner.tag}](https://discord.com/users/${owner.id})`, inline: true },
			{ name: '🤖 Version:', value: `FurBoi ${package.version}`, inline: true },
			{ name: '📚 Library:', value: `Discord.js ${package.dependencies['discord.js']}`, inline: true },
			{ name: '🛡️ Guilds:', value: `${client.guilds.cache.size}`, inline: true },
			{ name: '📔 Channels:', value: `${client.channels.cache.size}`, inline: true },
			{ name: "😀 Emoji's:", value: `${client.emojis.cache.size}`, inline: true },
			{ name: '📬 Invite:', value: `[Click Here](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=346176&scope=bot+applications.commands)`, inline: true },
			{ name: '💵 Ko-fi:', value: `[Click Here](${settings.donate})`, inline: true },
			{ name: '🚪 FurBoi Server:', value: `[Click Here](${settings.supportServer})`, inline: true },
		)

		// Send embed
		await fox.reply({embeds: [embed]})

	},
};