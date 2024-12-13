const settings = require("../../config/settings.js");
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'lick',
	description: 'Give user(s) a licking, mlem!',
  usage: "lick [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to lick",
  // 0 = Install as a guild command, 1 = Install as a user command
  integration_types: [0, 1],
  // 0 = Allow command to be run in guilds, 1 = Allow commands to be used in bot dms, 2 = Allow commands to be used in Private Messages
  contexts: [0, 1, 2],    
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r


    // Group responses
    const licks = [
        `gets up close to ${receivers} and licks them! \ud83d\udc45`,
        `softly licks ${receivers}! ${settings.lick}`,
        `licks ${receivers}! \ud83d\udc45`,
        `sticks out their tongue and licks ${receivers}! ${settings.lick}`,
        `slowly licks ${receivers}! \ud83d\udc45`,
        `licklicklicks ${receivers}! ${settings.lick}`,
        `puts their tongue on ${receivers} and gives them some licks! \ud83d\udc45`,
        `applies their tongue to ${receivers}! ${settings.lick}`,
        `gives a lick to ${receivers}! \ud83d\udc45`,
        `licks ${receivers}'s cheek! ${settings.lick}`,
        `licks ${receivers}'s nose! \ud83d\udc45`,
        `gives ${receivers} some soft licks! ${settings.lick}`,
        `slurp-licks ${receivers} ${settings.lick}`,
        `applies wet sloppy licks to ${receivers}.. ew, you're all wet! ${settings.lick}`
      ];

    let displayName = fox?.member?.displayName
    if (!displayName) displayName = fox.user.displayName

    const selfR = `**${displayName}** tries to lick their own elbows.. that looks kinda stupid :l`
    const rr = `**${displayName}** ` + licks[Math.floor(Math.random() * licks.length)]

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