const settings = require("../../config/settings.js");

module.exports = {

	name: 'bite',
	description: 'Give user(s) a little monch',
  usage: "bite [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to bite",  
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r

    
    const bites = [
        `slowly gets closer to ${receivers} and bites them! ${settings.bite}`,
        `softly nibbles on the ears of ${receivers} ${settings.bite}`,
        `gently nips ${receivers} ${settings.bite}`,
        `softly nibbles ${receivers} ${settings.bite}`,
        `gives ${receivers} a couple of soft bites ${settings.bite}`,
        `gently nibbles ${receivers} ${settings.bite}`,
        `bites ${receivers} ${settings.bite}`,
        `gets all bitey with ${receivers}, run! ${settings.bite}`,
        `chomps ${receivers}! ${settings.bite}`,
        `monches on ${receivers} ${settings.bite}`,
        `munchmunchmunches on ${receivers} ${settings.bite}`,
        `slides over to ${receivers} and monches them! ${settings.bite}`,
        `sinks their teeth into ${receivers}! Ouch! ${settings.bite}`,
        `chases after ${receivers} and bites them! ${settings.bite}`,
        `pokes ${receivers} and does a soft nibble ${settings.bite}`,
        `opens wide and chomps ${receivers}.. chomp chomp.. ${settings.bite}`,
        `surprises ${receivers} with some surprise nibbles! ${settings.bite}`,
        `monches and cronches ${receivers}.. i swear this is not vore!`,
        `gives ${receivers} a firm neck-bite! ${settings.bite}`,
        `monches on the ears of ${receivers} softly! ${settings.bite}`,
        `bites ${receivers} multiple times! ${settings.bite}`,
        `can't resist to bite ${receivers}! ${settings.bite}`,
        `bites into their yummy target(s): ${receivers} ${settings.bite}`
    ];


    const selfR = `**${fox.member.displayName}** bites their own arm for no reason. What a weirdo!`
    const rr = `**${fox.member.displayName}** ` + bites[Math.floor(Math.random() * bites.length)]

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