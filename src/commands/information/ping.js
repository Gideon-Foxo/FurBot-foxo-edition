const config = require("../../config/settings.js");
const Discord = require('discord.js');
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'ping',
	description: 'Ping!',
  	// 0 = Install as a guild command, 1 = Install as a user command
  	integration_types: [0, 1],
  	// 0 = Allow command to be run in guilds, 1 = Allow commands to be used in bot dms, 2 = Allow commands to be used in Private Messages
  	contexts: [0, 1, 2],
	async execute(fox, stuff) {

		// Defines the message (this is so we can easily edit it)
		let message = null;

		// The first embed that is sent
		const firstEmbed = new Discord.EmbedBuilder()
		.setColor(config.blue)
		.setDescription("Ping?")

		// Changes how it responds based on if the bot in text or slash mode
		if (stuff.text) message = await fox.channel.send({ embeds: [firstEmbed]})
		if (stuff.slash) message = await fox.reply({ embeds: [firstEmbed], fetchReply: true })

		// Defines the embed that the message is edited to
		const finishEmbed = new Discord.EmbedBuilder()
		.setColor(config.blue)
		.setDescription(`:information_source: Pong! Latency: **${message.createdTimestamp - fox.createdTimestamp}ms** Gateway: **${Math.round(fox.client.ws.ping)}ms** Uptime: ${snip.get.uptime()}`)

		// Edits the original message
		return await message.edit({embeds: [finishEmbed]})
	},
};