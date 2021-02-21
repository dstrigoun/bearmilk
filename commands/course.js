module.exports = {
    name: 'course',
    description: 'Return course information using SFU Course Information API.',
    usage: '<department> <course number>',
    execute(message, args) {
        const axios = require('axios');
        const Discord = require('discord.js');

        if (args.length != 2) {
            message.reply("Please add a course number to your request!\nFor example: CMPT 110 or ARCH 100");
            return;
        }

        const dept_regex = /^\w{2,4}$/g;
        const num_regex = /^\d{2,4}$/g;
        if (args[0].match(dept_regex)) {
            var dept = args[0];
        }
        if (args[1].match(num_regex)) {
            var course_num = args[1];
        }

        axios.get(`http://www.sfu.ca/bin/wcm/course-outlines?2021/summer/${dept}/${course_num}/d100`)
            .then((res) => {
                let name = res.data.info.name;
                let title = res.data.info.title;
                let term = res.data.info.term;
                let prof = res.data.instructor[0]['name'];

                const attachment = new Discord.MessageAttachment('./resources/icons/pencil.png', 'pencil.png');

                const courseInfo = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(name)
                    .setURL(`http://www.sfu.ca/outlines.html?2021/summer/${dept}/${course_num}/d100`)
                    .setDescription(title)
                    .addField('Professor', prof, true)
                    .addField('Term', term, true)
                    .attachFiles(attachment)
                    .setThumbnail('attachment://pencil.png');

                message.reply(courseInfo);
            })
            .catch(function (error) {
                if (error.response.status == 404) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    message.reply("That course is not running in the Summer 2021.");
                }
            });
    }
}