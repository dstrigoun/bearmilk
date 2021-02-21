module.exports = {
    name: 'link',
    description: 'Provides a link to the specific SFU site!\nI\'m kinda like Google, what can I say??\nValid keywords are: Scholarships, Tuition, Exchange, Co-op, Rec',
    usage: '<keyword>',
    example: '!link scholarships fees clubs',
    execute(message, args) {
        if (args.length == 0) {
            message.reply("Add a keyword to get specific links!\nI think you can type sfu.ca on your own bud 😛");
            return;
        }

        const Discord = require('discord.js');
        let links = "";

        for (let command of args) {
            switch(command.toLowerCase()) {
                case "scholarship":
                case "scholarships":
                    links += "Scholarships: https://www.sfu.ca/students/financialaid/undergrad/scholarships.html\n";
                    break;
                case "tuition":
                case "fees":
                    links += "Tuition & Fees: https://www.sfu.ca/students/fees.html\n";
                    break;
                case "calendar":
                    links += "Academic Calendar: http://www.sfu.ca/students/calendar/2021/summer.html\n";
                    break;
                case "exchange":
                    links += "Exchange: https://www.sfu.ca/students/studyabroad/exchanges.html\n";
                    break;
                case "co-op":
                    links += "Co-op: http://www.sfu.ca/coop.html\n";
                    break;
                case "clubs":
                case "sfss":
                    links += "SFSS Clubs: https://go.sfss.ca/clubs/list\n";
                    break;
                case "rec":
                    links += "Recreation Centre: https://athleticsandrecreation.its.sfu.ca/\n";
                    break;
            }
        }

        const attachment = new Discord.MessageAttachment('./resources/icons/university.png', 'university.png');

        const linkList = new Discord.MessageEmbed()
            .setTitle("SFU Links")
            .setDescription(links)
            .attachFiles(attachment)
            .setThumbnail('attachment://university.png') ;
    
        message.reply(linkList);
    }
}