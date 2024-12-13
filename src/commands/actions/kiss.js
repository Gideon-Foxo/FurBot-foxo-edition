const settings = require("../../config/settings.js");
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'kiss',
	description: "Give user(s) a big ol' smooch",
  usage: "kiss [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to kiss",
  // 0 = Install as a guild command, 1 = Install as a user command
  integration_types: [0, 1],
  // 0 = Allow command to be run in guilds, 1 = Allow commands to be used in bot dms, 2 = Allow commands to be used in Private Messages
  contexts: [0, 1, 2],  
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r


    // Group responses
    const kisses = [
        `jumps on ${receivers} and smooches them! ${settings.kiss}`,
        `walks up to ${receivers} and kisses them! ${settings.kiss}`,
        `kisses ${receivers}! ${settings.kiss}`,
        `gives ${receivers} a quick kiss~ ${settings.kiss}`,
        `gives ${receivers} a little smooch ${settings.kiss}`,
        `gives ${receivers} a kiss! ${settings.kiss}`,
        `smooches ${receivers}! ${settings.kiss}`,
        `awkwardly kisses ${receivers} ${settings.kiss}`,
        `gives multiple kisses to ${receivers}! ${settings.kiss}`,
        `shyly walks up to ${receivers} and gives them a quick kiss~ ${settings.kiss}`,
        `gives ${receivers} a big smooch! ${settings.kiss}`,
        `lovingly smooches ${receivers}! ${settings.kiss}`,
        `happily kisses ${receivers} ${settings.kiss}`,
        `kisses ${receivers} on the nose ${settings.kiss}`,
        `smiles and kisses ${receivers}! ${settings.kiss}`,
        `smiles and gives ${receivers} a little kiss! ${settings.kiss}`,
        `gladly kisses ${receivers}! ${settings.kiss}`,
        `blushes and gives ${receivers} a quick kiss! ${settings.kiss}`,
        `blushes and kisses ${receivers}! ${settings.kiss}`,
        `completely covers ${receivers} in kisses! ${settings.kiss}`,
        `hangs some mistletoe over the head of ${receivers} and smooches them ${settings.kiss}`,
        `shouts "Gimme some sugar baby!" and kisses ${receivers} ${settings.kiss}`
      ];

    let displayName = fox?.member?.displayName
    if (!displayName) displayName = fox.user.displayName

    const selfR = `**${displayName}** walks up to a mirror and kisses themselves! How odd..`
    const rr = `**${displayName}** ` + kisses[Math.floor(Math.random() * kisses.length)]

    // Add the user action data into the database if it is enabled
    if (settings.database && stuff.rIds.length) snip.actionData((stuff.prefix) ? fox.author.id : fox.user.id, stuff.rIds, this.name)

    if (stuff.text) {
      if (stuff.r?.length) return await fox.channel.send(rr)
      else return await fox.channel.send(selfR)
    }
    else if (stuff.slash) {
      if (stuff.r?.length) return await fox.reply(rr)
      else return await fox.reply(selfR)
    }
	},
};