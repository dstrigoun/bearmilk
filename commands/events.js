const creds = require('../creds.js');
const axios = require('axios');
const Discord = require('discord.js');

const event_display_size = 10;

module.exports = {
  name: 'events',
  description: 'Find upcoming events',

  execute(message, args) {

    axios.get('http://api.lib.sfu.ca/workshops/list')
      .then((resp) => {
        const vals = resp.data; 

        let currDate = new Date();
        let index = currDate.toLocaleDateString();
        let frmtDate = currDate.toDateString();

        let arr = new Array();
        
        for (entry in vals) {
          // console.log(vals[entry][0].date);
          let date = vals[entry][0].date; 
          if (date >= index) {
            arr.push(vals[entry][0]);
            if (arr.length == event_display_size) {
              break;
            }
          }
        }

        const richMsg = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Upcoming Events`)
        .setURL('https://discord.js.org/')
        .setAuthor(`Here are some upcoming event workshops, ${message.author.tag}`)
        .setDescription(`Please note that many events are transitioning to an online format. Please check included link for more details.`)

        // .attachFiles(attachment)
        // .setThumbnail('attachment://partly_sunny.png')  
        // .addFields(
        //   {name: `${arr[0].name}`, value: `Speaker: ${arr[0].facilitator}\n Time : ${arr[0].start} - ${arr[0].end}\n Link: ${arr[0].url}`},
          // {name: `${library_name_2}`, value: `Current Status: ${status_2}\n Hours : ${library_hours_2}\n Book Room: ${book_room_2}`},
          // {name: `${library_name_3}`, value: `Current Status: ${status_3}\n Hours : ${library_hours_3}\n Book Room: ${book_room_3}`},
          // {name: `${library_name_4}`, value: `Current Status: ${status_4}\n Hours : ${library_hours_4}\n Book Room: ${book_room_4}`}
        
        for (el in arr) {
          console.log(arr[el]);
          if (arr[el].date != index) {
            index = arr[el].date;
            currDate = new Date(index);
            frmtDate = currDate.toDateString();
            richMsg.addField(`${frmtDate}`, '==================================================');
          }

          richMsg.addField(`${arr[el].name}`, `Speaker: ${arr[el].facilitator}\n Time : ${arr[el].start} - ${arr[el].end}\n Link: ${arr[el].url}`);

        }  
          
        message.reply(richMsg);

        // console.log(arr);
    });   
    
  }
}