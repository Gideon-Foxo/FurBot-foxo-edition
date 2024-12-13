const settings = require("../../config/settings.js");
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'nuzzle',
	description: 'Give user(s) a nuzzle!',
  usage: "nuzzle [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to nuzzle",
  // 0 = Install as a guild command, 1 = Install as a user command
  integration_types: [0, 1],
  // 0 = Allow command to be run in guilds, 1 = Allow commands to be used in bot dms, 2 = Allow commands to be used in Private Messages
  contexts: [0, 1, 2],  
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r


    // Group responses
    const nuzzles = [
        `gets up close to ${receivers} and nuzzles them! ${settings.nuzzle}`,
        `softly nuzzles ${receivers}! ${settings.nuzzle}`,
        `nuzzles ${receivers}! ${settings.nuzzle}`,
        `nuzzles ${receivers} softly! ${settings.nuzzle}`,
        `nuzzles ${receivers} gently! ${settings.nuzzle}`,
        `quickly nuzzles ${receivers}! ${settings.nuzzle}`,
        `sneakily nuzzles ${receivers}! ${settings.nuzzle}`,
        `slowly nuzzles ${receivers}! ${settings.nuzzle}`,
        `gets their nose up close to ${receivers} and nuzzles them! ${settings.nuzzle}`,
        `nuzzles ${receivers} cheek ${settings.nuzzle}`,
        `nuzzles ${receivers} chest ${settings.nuzzle}`,
        `softly nuzzles ${receivers} warm and close ${settings.nuzzle}`,
        `applies soft little nuzzles to ${receivers} ${settings.nuzzle}`,
        `gets up close to ${receivers} and nuzzles them! ${settings.nuzzle}`,
        `gets nice and close to ${receivers} for a soft nuzzle ${settings.nuzzle}`
      ];

    let displayName = fox?.member?.displayName
    if (!displayName) displayName = fox.user.displayName

    const selfR = `**${displayName}** nuzzles a pillow.. those are also soft.. i guess :c`
    const rr = `**${displayName}** ` + nuzzles[Math.floor(Math.random() * nuzzles.length)]

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