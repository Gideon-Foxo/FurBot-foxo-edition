const settings = require("../../config/settings.js");
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'shoot',
	description: 'Aim and fire, point a gun at one or multiple users!',
  usage: "shoot [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to shoot", 
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r


    // Group responses
    const shoots = [
        `grabs their pistol and empties the chambers at ${receivers}, sayonara! :scream:${settings.shoot}`,
        `grabs their pistol and takes aim at ${receivers}, "any last words?!" :scream:${settings.shoot}`,
        `holds their pistol and points it at ${receivers}, pulling back the trigger. :scream:${settings.shoot}`,
        `fires their ${settings.shoot} at ${receivers} :scream:${settings.shoot}!`,
        `fires their ${settings.shoot} at ${receivers}, but every shot misses...`,
        `just shot ${receivers} :scream:!`,
        `just shot at ${receivers}, RIP :scream:${settings.shoot}`,
        `just shot at ${receivers}, but completely missed...`,
        `takes out their shotgun and pumps ${receivers} full of lead ${settings.shoot}`,
        `takes out their shotgun but forgot the ammo.. ${receivers} live(s) another day`,
        `grabs their ${settings.shoot} and shoots ${receivers} dead. Unless they use Apple in which case they are very wet.`,
        `pulls out an AK and rapidly mows down ${receivers}. :skull::urn:`,
        `pulls out their ${settings.shoot} and fires some rounds into the legs of ${receivers}`,
        `pulls out their MP7 and shoots at ${receivers}. Bloody!`,
        `pulls out their gun but forgot they don't even own a gun... whoops.`,
        `takes aim with their finger and fires some imaginary bullets at ${receivers}`,
        `no-scopes ${receivers} ${settings.shoot}`,
        `shot ${receivers} with their sniper from a bedroom window ${settings.shoot}`,
        `hey ${receivers}.. it's high noon ${settings.shoot}`,
        `just shot ${receivers} in the chest with their pistol ${settings.shoot}`,
        `just shot ${receivers} THROUGH THE HEART AND YOU'RE TO BLAME. DARLIN' YOU GIVE LOOOOVE A BAD NAME! ${settings.shoot}`
    ];

    const selfR = `**${fox.member.displayName}** shoots themselves! :dizzy_face:${settings.shoot} R.I.P. Press [F] to pay respects.`
    const rr = `**${fox.member.displayName}** ` + shoots[Math.floor(Math.random() * shoots.length)]

    // Add the user action data into the database if it is enabled
    if (settings.database && stuff.rIds.length) snip.actionData((stuff.prefix) ? fox.author.id : fox.user.id, stuff.rIds, this.name)

    if (stuff.text) {
      if (stuff.r?.length) return await fox.channel.send(rr)
      else {
          const message = await fox.channel.send(selfR)
        return await message.react("🇫")
      }
    }
    else if (stuff.slash) {
      if (stuff.r?.length) return await fox.reply(rr)
      else  {
          const message = await fox.reply({content: selfR, fetchReply: true})
          return await message.react("🇫")
      }
    }
	},
};