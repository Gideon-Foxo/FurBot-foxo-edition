const settings = require("../../config/settings.js");
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'feed',
	description: 'Give user(s) some food, use `yum` (optional) to not feed bugs',
  usage: "feed [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to give food too",    
  // 0 = Install as a guild command, 1 = Install as a user command
  integration_types: [0, 1],
  // 0 = Allow command to be run in guilds, 1 = Allow commands to be used in bot dms, 2 = Allow commands to be used in Private Messages
  contexts: [0, 1, 2],  
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r


    // Self responses
    const foods = [
        `gives ${receivers} a delicious \uD83C\uDF4E Mmmm!`,
        `gives ${receivers} a delicious \uD83C\uDF50 Tasty!`,
        `gives ${receivers} a delicious \uD83C\uDF4A Nom!`,
        `gives ${receivers} a delicious \uD83C\uDF4C Nice!`,
        `gives ${receivers} a delicious \uD83C\uDF49 Mmmmm!`,
        `gives ${receivers} a delicious \uD83C\uDF53 Tastes good!`,
        `gives ${receivers} a delicious \uD83C\uDF51 Yum Yum!`,
        `gives ${receivers} some delicious \uD83C\uDF52 Tasty!`,
        `gives ${receivers} a delicious \uD83C\uDF4D Woo!`,
        `shares a \uD83C\uDF54 with ${receivers}`,
        `shares some \uD83C\uDF5F with ${receivers}`,
        `hands ${receivers} some real good \uD83C\uDF2E !`,
        `prepares some tasty \uD83C\uDF63 for ${receivers}!`,
        `feeds ${receivers} some \uD83C\uDF47 like they're royalty!`,
        `has prepared some nice cold \uD83C\uDF68 for ${receivers}!`,
        `stuffs a yummy \uD83C\uDF69 in the mouth(s) of ${receivers}!`,
        `cooks some fine \uD83C\uDF5C for ${receivers}!`,
        `cooks up some \uD83C\uDF72 for ${receivers}!`,
        `has prepared some \uD83C\uDF5D for ${receivers}!`,
        `has made some nice \uD83C\uDF5B for ${receivers}!`,
        `tosses a warm slice of \uD83C\uDF55 to ${receivers}!`,
        `gives ${receivers} a delicious \uD83D\uDC1B ..what? Ew!`,
        `gives ${receivers} a delicious \uD83D\uDC1E ..what? Yuck!`,
        `stuffs a gross, big, crawly \uD83D\uDD77 in the mouth(s) of ${receivers}. Yum!`
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

    let displayName = fox?.member?.displayName
    if (!displayName) displayName = fox.user.displayName

    const selfR = `**${displayName}** eats all the food themselves... How greedy!! :angry:`
    const rr = `**${displayName}** ` + foods[Math.floor(Math.random() * foods.length)]

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