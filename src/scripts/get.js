const Discord = require('discord.js');
const log = require('dbot-console-logger');
const config = require('../config/settings.js');
const client = require('../index.js')
const snip = require('./snippets.js');



const get = {

    // Makes a unique key that can be used for things like the store 
    key: function () {
        return Date.now().toString(16) + Math.round(Math.random() * 1e10).toString(16)
    },

    // Returns a timestamp 
    timestamp: function (time = Date.now(), old) {
        if (old) return timeConversion(time - Date.now())
        return `<t:${Math.round(time / 1000)}:R>`
    },
    
    // Fetches the clients uptime
    uptime: function () {
        return timeConversion(Date.now() - client.startTime)
    }
}


function timeConversion(millisec) {

    var seconds = (millisec / 1000).toFixed(0);
    var minutes = (millisec / (1000 * 60)).toFixed(0);
    var hours = (millisec / (1000 * 60 * 60)).toFixed(0);
    var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);
    var years = (millisec / (1000 * 60 * 60 * 24 * 365)).toFixed(0);

    if (seconds < 60) return `**${seconds}** Seconds`; 
    else if (minutes < 60) return `**${minutes}** Minute${(minutes > 1) ? "s" : ""}`;
    else if (hours < 24) return `**${hours}** Hour${(hours > 1) ? "s" : ""}`;
    else if (days < 365) return `**${days}** Day${(days > 1) ? "s" : ""}`
    else return `**${years}** Year${(years > 1) ? "s" : ""}`
}



module.exports = get