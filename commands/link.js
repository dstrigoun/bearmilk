module.exports = {
    name: 'link',
    description: 'Return link based on args?',
    execute(message, args) {
        if (args.length == 0) {
            message.reply("Add a keyword to get specific links\nFor example: Exchange, Co-op, Advising, etc.");
            return;
        }

        const Discord = require('discord.js');
        let links = "";

        for (let command of args) {
            switch(command) {
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

        const linkList = new Discord.MessageEmbed()
            .setTitle("SFU Links")
            .setDescription(links);
    
        message.reply(linkList);
    }
}