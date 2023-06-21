const settings = require("../../config/settings.js");
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'bark',
	description: 'Bark at user(s)',
  usage: "bark [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to bark at",
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r


    // Self responses
    const selfbarks = [
      `barks out loud!`,
      `barks for attention!`,
      `barks to make their presence known!`,
      `barks at everyone!`,
      `barks happily!`,
      `barks loudly!`,
      `barks at their mirror image!`,
      `barks at their own tail!`,
      `barks softly!`,
      `barks up the wrong tree!`
    ];


    // Group responses
    const barks = [
      `barks at ${receivers}!`,
      `yips at ${receivers}!`,
      `lets out a few barks at ${receivers}!`,
      `scoots over to ${receivers} and barks at them!`,
      `bark bark barks at ${receivers}!`,
      `yaps and barks at ${receivers}!`,
      `pokes ${receivers} and barks at them!`,
      `barks loudly at ${receivers}!`,
      `barks a whole lot at ${receivers}!`,
      `casually barks at ${receivers}!`,
      `tries to get the attention of ${receivers} by barking at them!`,
      `barks at ${receivers} from a distance!`,
      `lets out a sharp bark at ${receivers}!`,
      `happily barks at ${receivers}!`,
      `barks a couple of times at ${receivers}!`,
      `boofs at ${receivers}!`,
      `wants attention so they bark at ${receivers}!`,
      `barks once at ${receivers}!`,
      `runs towards ${receivers}, barking the whole way!`,
      `continually barks at ${receivers}!`,
      `doesn't stop barking at ${receivers}!`
    ];

    const selfR = `**${fox.member.displayName}** ` + selfbarks[Math.floor(Math.random() * selfbarks.length)]
    const rr = `**${fox.member.displayName}** ` + barks[Math.floor(Math.random() * barks.length)]

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