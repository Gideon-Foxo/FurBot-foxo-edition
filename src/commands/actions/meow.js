const settings = require("../../config/settings.js");
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'meow',
	description: 'Meow at User(s)',
  usage: "meow [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to meow at",  
  // 0 = Install as a guild command, 1 = Install as a user command
  integration_types: [0, 1],
  // 0 = Allow command to be run in guilds, 1 = Allow commands to be used in bot dms, 2 = Allow commands to be used in Private Messages
  contexts: [0, 1, 2],  
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r


    // Self responses
    const selfmeows = [
        `meows out loud!`,
        `meows for attention!`,
        `meows to make their presence known!`,
        `meows at everyone!`,
        `meows happily!`,
        `meows loudly!`,
        `meows at their mirror image!`,
        `meows at their own tail!`,
        `meows softly!`,
        `meow meow meows!`,
        `meows: OH LONG JOHNSON!`
      ];


    // Group responses
    const meows = [
        `meows at ${receivers}!`,
        `softly meows into the ears of ${receivers}!`,
        `lets out a few short meows at ${receivers}!`,
        `scoots over to ${receivers} and meows at them!`,
        `meow meows at ${receivers}!`,
        `purrs and meows at ${receivers}!`,
        `pokes ${receivers} and meows at them!`,
        `meows a whole lot at ${receivers}!`,
        `casually meows at ${receivers}!`,
        `tries to get the attention of ${receivers} by meowing!`,
        `meows at ${receivers} from a distance!`,
        `lets out a soft meow at ${receivers}!`,
        `happily meows at ${receivers}!`,
        `meows a couple of times at ${receivers}!`,
        `meows softly at ${receivers}!`,
        `wants attention so they meow at ${receivers}!`,
        `meows once at ${receivers}!`,
        `curls up on top of ${receivers} and meows contently!`,
        `continually meows at ${receivers}!`,
        `doesn't stop meowing at ${receivers}!`,
        `lets out an adorable meow at ${receivers}!`
      ];

    let displayName = fox?.member?.displayName
    if (!displayName) displayName = fox.user.displayName

    const selfR = `**${displayName}** ` + selfmeows[Math.floor(Math.random() * selfmeows.length)]
    const rr = `**${displayName}** ` + meows[Math.floor(Math.random() * meows.length)]

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