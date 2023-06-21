const Discord = require('discord.js');
const log = require('dbot-console-logger');
const config = require('../config/settings.js');
const client = require('../index.js')
const database = require('../database.js');

// Other helper files
const get = require("./get");
const { db } = require('dbot-console-logger');


// Base data for user database
let baseData = {

    giving: {
        bark: 0,
        bite: 0,
        boop: 0,
        feed: 0,
        hug: 0,
        kiss: 0,
        lick: 0,
        meow: 0,
        nuzzle: 0,
        pet: 0,
        poke: 0,
        shoot: 0,
        slap: 0,
        spank: 0,
    }, 
    receiving: {
        bark: 0,
        bite: 0,
        boop: 0,
        feed: 0,
        hug: 0,
        kiss: 0,
        lick: 0,
        meow: 0,
        nuzzle: 0,
        pet: 0,
        poke: 0,
        shoot: 0,
        slap: 0,
        spank: 0,
    }
}


// Is the confirm function
const confirm = function (fox, content, emp = false, edit = true) {


    // Creates promises
    return new Promise (async (resolve, reject) => {
        

        const row = [
            { label: 'Confirm', style: Discord.ButtonStyle.Success, type: 2, customId: 'confirm' },
            { label: 'Cancel', style: Discord.ButtonStyle.Danger, type: 2, customId: 'cancel' }
        ]

        const embed = new Discord.EmbedBuilder()
        // @ts-ignore
        .setColor(config.orange)
        .setDescription(content)

        message = await fox.reply({embeds: [embed], components: [{type: 1, components: row}], ephemeral: emp})


        // Creates the reaction listener for only the message author
        const filter =  (interaction) => interaction.user.id === fox.user.id
        const collector = await message.createMessageComponentCollector({ filter, idle: 60000 })

        // When a button is used :O
        collector.on('collect', async (i) => {


            // If cancel
            if (i.customId === "cancel") {
                collector.stop('skip_edit')


                const embed = new Discord.EmbedBuilder()
                .setColor(config.embed)
                .setDescription("Command cancelled.")
                await i.update({embeds: [embed], components: [], ephemeral: emp})

                return resolve(false)
            }
            // If confirm
            if (i.customId === "confirm") {
                collector.stop('skip_edit')

                // Returns the message object, YOU MUST REMOVE THE BUTTONS
                return resolve(i)
            }   
        })

    
        // If times out
        collector.on('end', async (collected, reason) => {
            
            // If embed timed out (and doesnt have the reason skip_edit)
            if (reason === "skip_edit") return

            resolve(null)

            const embed = new Discord.EmbedBuilder()
            .setColor(config.embed)
            .setDescription("Command timed out.")
            await i.update({embeds: [embed], components: []})
        })
    })
}



async function actionData (giver, receivers, action) {

    let data = structuredClone(baseData)
    data.receiving[action] = 1


    // Update the users and return to show which ones were updated
    const result = await database.table("users").getAll(...receivers).update(row => ({ receiving: { [action]: row('receiving')(action).default(0).add(1) } }), { returnChanges: true }).run()
    // Filter the list for which users need to be inserted into the table

    const insertIds = receivers.filter(id => !result?.changes?.find(c => c.new_val.id === id))
    await database.table("users").insert(insertIds.map(id => ({ id, ...data }))).run()

    const giveUser = await database.table("users").get(giver).run()
    if(!giveUser) await database.table("users").insert({id: giver, ...baseData})

    await database.table("users").get(giver).update(row => ({ giving: { [action]: row('giving')(action).default(0).add(receivers.length) } })).run()
} 










module.exports = {
    get,
    confirm,
    actionData
}