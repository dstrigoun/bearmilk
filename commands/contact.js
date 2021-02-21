function coop(faculty) {
    let title;
    let phone;
    let email;
    switch(faculty) {
        case "arts":
            title = "Arts & Social Sciences";
            phone = "778.782.5839";
            email = "artscoop@sfu.ca";
            break;
        case "bus":
            title = "Beedie School of Business";
            email = "pabuscoop@sfu.ca";
            phone = "778.782.3619";
            break;
        case "bpk":
            title = "Biomedical Physiology and Kinesiology";
            email = "bpkhscoop@sfu.ca";
            phone = "778.782.5712";
            break;
        case "comm":
            title = "Communication";
            email = "sangitam@sfu.ca";
            phone = "778.782.5367";
            break;
        case "cmpt":
            title = "Computing Science";
            email = "cscooppa@sfu.ca";
            phone = "778.782.2185";
            break;
        case "engsci":
            title = "Engineering Science";
            email = "paengcoop@sfu.ca";
            phone = "778.782.5885";
            break;
        case "env":
            title = "Environment";
            email = "scicoop@sfu.ca";
            phone = "778.782.4716";
            break;
        case "hsci":
            title = "Health Sciences";
            email = "bpkhscoop@sfu.ca";
            phone = "778.782.7632";
            break;
        case "iat":
            title = "Interactive Arts & Technology";
            email = "siatcoop@sfu.ca";
            phone = "778.782.7430";
            break;
        case "mse":
            title = "Mechatronic Systems Engineering";
            email = "msesosycoop@sfu.ca";
            phone = "778.782.9621";
            break;
        case "sci":
            title = "Science";
            email = "scicoop@sfu.ca";
            phone = "778.782.4716";
            break;
        case "see":
            title = "Sustainable Energy Engineering";
            email = "seecoop@sfu.ca";
            phone = "778.782.4313";
            break;
        case "sosy":
            title = "Software Systems";
            email = "fascoop@sfu.ca";
            phone = "778.782.4313";
            break;
    }
    return [title, email, phone];
}

module.exports = {
    name: 'contact',
    description: 'Return contact information for specified keyword. Valid keywords: Advising, Health, Co-op, and General\nFor Co-op, please add a faculty keyword.\nFaculties: arts, bus, bpk, comm, engsci, env, hsci, iat, mse, sci, see, sosy',
    usage: '<keyword> <optional: faculty>',
    execute(message, args) {
        const Discord = require("discord.js");

        if (!args.length) {
            var keyword = "general";
        } else {
            keyword = args[0].toLowerCase();
        }

        var contactMsg = new Discord.MessageEmbed()
            .setTitle("Contact Information");

        let name;
        let value;
        switch(keyword) {
            case "advising":
                name = "General Academic Advising";
                value = "Email: myadv@sfu.ca\nPhone: 778.782.6930";
                contactMsg.addField(name, value, false);
                break;
            case "health":
                contactMsg.addField("Burnaby Clinic", "Phone: 778.782.4615", true);
                contactMsg.addField("Vancouver Clinic", "Phone: 778.782.5200", true);
                contactMsg.addField("Surrey Clinic", "Phone: 778.782.5200", true);
                contactMsg.addField("Email", "hcsinfo@sfu.ca", false);
                break;
            case "co-op":
                if (args.slice(1).length > 0) {
                    info = coop(args[1]);
                    contactMsg.addField(info[0], `Email: ${info[1]}\nPhone: ${info[2]}`, false);
                } else {
                    message.reply("Please add a faculty argument to your command.\nFor example, \`!contact co-op sosy\`");
                    return;
                }
                break;
            case "general":
                name = "General Contact Information";
                value = "Email: reginfo@sfu.ca\nPhone: 778.782.6930";
                contactMsg.addField(name, value, false);
                break;
        }

        contactMsg.addField("Dasha Strigoun", "@dooshadoosh", false);

        message.reply(contactMsg);
    }
  }