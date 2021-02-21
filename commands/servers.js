module.exports = {
    name: 'servers',
    description: 'Return SFU related discord servers',
    usage: '[command name]',
    execute(message, args) {
        const Discord = require('discord.js');

        const serverList = new Discord.MessageEmbed()
            .setTitle("List of SFU Discord servers")
            .addField("SFU", "https://discord.gg/ZyEWFC4", false)
            .addField("SFU CS^3", "https://discord.gg/FSdAkEUg", false)
            .addField("SFU Science", "https://discord.gg/PpaeD63", false)
            .addField("SFU Economics", "https://discord.gg/yNWfRSR", false)
            .addField("SFU Engineering", "https://discord.gg/Pyasfh8e", false);
        
        message.reply(serverList);
    }
}