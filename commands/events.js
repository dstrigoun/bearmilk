const creds = require('../creds.js');
const axios = require('axios');
const Discord = require('discord.js');

const event_display_size = 6;

module.exports = {
  name: 'events',
  description: 'Find upcoming events',
  usage: '',
  example: '!events',
  execute(message, args) {

    axios.get('http://api.lib.sfu.ca/workshops/list')
      .then((resp) => {
        const vals = resp.data; 

        let currDate = new Date();
        let index = currDate.toLocaleDateString();
        let frmtDate = currDate.toDateString();

        let arr = new Array();
        
        for (entry in vals) {
          let date = vals[entry][0].date; 
          if (date >= index) {
            arr.push(vals[entry][0]);
            if (arr.length == event_display_size) {
              break;
            }
          }
        }

        const attachment = new Discord.MessageAttachment('./resources/icons/calendar.png', 'calendar.png');

        const richMsg = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Upcoming Events`)
        .setAuthor(`Here are some upcoming event workshops, ${message.author.tag}`)
        .setDescription(`Please note that many events are transitioning to an online format. Please check included link for more`)
        .attachFiles(attachment)
        .setThumbnail('attachment://calendar.png');
        
        for (el in arr) {
          if (arr[el].date != index) {
            index = arr[el].date;
            currDate = new Date(index);
            frmtDate = currDate.toDateString();
            richMsg.addField(`${frmtDate}`, '===============================================');
          }

          richMsg.addField(`${arr[el].name}`, `Speaker: ${arr[el].facilitator}\n Time : ${arr[el].start} - ${arr[el].end}\n Link: ${arr[el].url}`);

        }  
          
        message.reply(richMsg);
    });   
    
  }
}