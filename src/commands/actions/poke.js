const settings = require("../../config/settings.js");

module.exports = {

	name: 'poke',
	description: 'Give user(s) a poke, maybe with a stick!',
  usage: "poke [@User/ID] [@User/ID]...",
    // This is the description for the user option
    slashDescrip: "A user to poke", 
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r


    // Group responses
    const pokes = [
        `sneaks up behind ${receivers} and pokes them! ${settings.poke}`,
        `secretly pokes ${receivers} ${settings.poke}`,
        `pokes ${receivers} in their sides! ${settings.poke}`,
        `walks up to ${receivers} and gives em a poke ${settings.poke}`,
        `pokes ${receivers}.. then pokes them again! ${settings.poke}`,
        `quickly pokes ${receivers}! ${settings.poke}`,
        `pokepokepokes ${receivers}! ${settings.poke}`,
        `leans over to ${receivers} and gives 'em a little poke! ${settings.poke}`,
        `pokes ${receivers} with a stick.. mm, pointy! ${settings.poke}`,
        `almost pokes ${receivers} in the eye but manages to recover! ${settings.poke}`,
        `softly pokes ${receivers} in their tum ${settings.poke}`,
        `pokes ${receivers} in the neck! ${settings.poke}`,
        `pokes ${receivers} on their shoulder, hewwo? ${settings.poke}`,
        `pokes ${receivers} on the cheek, but which cheek.. ${settings.poke}`,
        `sticks out their arm and rapidly pokes their target(s): ${receivers} !!! ${settings.poke}`,
        `pokes ${receivers} a couple of times.. hey wake up! ${settings.poke}`,
        `pokes ${receivers} with a random carrot they found on the sidewalk! ${settings.poke}`,
        `pokes ${receivers} with beans.. BEANS!!! ${settings.poke}`
      ];

    const selfR = `**${fox.member.displayName}** pokes their own face. ${settings.poke}`
    const rr = `**${fox.member.displayName}** ` + pokes[Math.floor(Math.random() * pokes.length)]

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