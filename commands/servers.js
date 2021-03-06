module.exports = {
    name: 'servers',
    description: 'Provides some related SFU discord links!\nGo make some new friends 🐻♥',
    usage: '',
    example: '!servers',
    execute(message, args) {
        const Discord = require('discord.js');

        const attachment = new Discord.MessageAttachment('./resources/icons/server.png', 'server.png');

        const serverList = new Discord.MessageEmbed()
            .setTitle("List of SFU Discord servers")
            .addField("SFU", "https://discord.gg/ZyEWFC4", false)
            .addField("SFU CS^3", "https://discord.gg/FSdAkEUg", false)
            .addField("SFU Science", "https://discord.gg/PpaeD63", false)
            .addField("SFU Economics", "https://discord.gg/yNWfRSR", false)
            .addField("SFU Engineering", "https://discord.gg/Pyasfh8e", false)
            .attachFiles(attachment)
            .setThumbnail('attachment://server.png');
        
        message.reply(serverList);
    }
}