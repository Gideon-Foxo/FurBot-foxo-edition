const config = require("../../config/settings.js");
const Discord = require('discord.js');
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'ping',
	description: 'Ping!',
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