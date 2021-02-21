const creds = require('../creds.js');
const axios = require('axios');
const Discord = require('discord.js');

const textbooks_limit = 2;

module.exports = {
  name: 'library',
  description: 'Provides information on SFU Library!\nGet general info or textbooks you need for a course 📕',
  usage: '[about | textbook <course department> <course number>]',
  example: '!library textbook cmpt 115',
  execute(message, args) {
  
    if (args.length == 0) {
      message.reply("Please enter a valid library command (About / Textbook)");
      return;
    }

    const command = args[0].toLowerCase();
    const currDate = new Date();

    switch (command) {
      case "about":        
        // make API call
        axios.get('http://api.lib.sfu.ca/hours/3/summary?date=2021-01-15')
        .then((resp) => {

          const lib = resp.data.locations;

          const library_name_1 = lib[0].location_name;
          const library_name_2 = lib[1].location_name;
          const library_name_3 = lib[2].location_name;
          const library_name_4 = lib[3].location_name;

          const library_hours_1 = lib[0].details_string;
          const library_hours_2 = lib[1].details_string;
          const library_hours_3 = lib[2].details_string;
          const library_hours_4 = lib[3].details_string;

          const status_1 = (lib[0].open_now) ? "open" : "closed";
          const status_2 = (lib[1].open_now) ? "open" : "closed";
          const status_3 = (lib[2].open_now) ? "open" : "closed";
          const status_4 = (lib[3].open_now) ? "open" : "closed";

          
          const book_room_1 = lib[0].room_booking;
          const book_room_2 = lib[1].room_booking;
          const book_room_3 = lib[2].room_booking;
          const book_room_4 = lib[3].room_booking;

          const attachment = new Discord.MessageAttachment('./resources/icons/about.png', 'about.png');

          const richMsg = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`Library Hours`)
          .setURL('https://discord.js.org/')
          .setAuthor(`Here are the current library hours, ${message.author.tag}!`)
          .setDescription(`Just so you know, the current hours are being affected by COVID-19 lockdown protocol.`)
          .attachFiles(attachment)
          .setThumbnail('attachment://about.png')  
          .addFields(
            {name: `${library_name_1}`, value: `Current Status: ${status_1}\n Hours : ${library_hours_1}\n Book Room: ${book_room_1}`},
            {name: `${library_name_2}`, value: `Current Status: ${status_2}\n Hours : ${library_hours_2}\n Book Room: ${book_room_2}`},
            {name: `${library_name_3}`, value: `Current Status: ${status_3}\n Hours : ${library_hours_3}\n Book Room: ${book_room_3}`},
            {name: `${library_name_4}`, value: `Current Status: ${status_4}\n Hours : ${library_hours_4}\n Book Room: ${book_room_4}`}
          )
          
          message.reply(richMsg);
            
        })
        break;
      case "textbook":
        let course_num = "";
        let course_sub = "";
        let params = args.slice(1);
        let count = 0;

        if (params.length == 0) {
          message.reply("I need more information! Please add at least a course subject, like CMPT");
          return;
        }

        for (el in params) {
          if (isNaN(params[el])) {
            course_sub = params[el];
          } else {
            course_num =params[el];
          }
        }

        let sub_payload = (course_sub.length != 0) ? "department=" + course_sub : "";
        let num_payload = (course_num.length != 0) ? "number=" + course_num : "";

        if (sub_payload.length == 0) {
          message.reply("I need more information! Please add at least a course subject, like CMPT");
          return;
        }

        if (num_payload.length != 0 && sub_payload.length != 0) {
          num_payload = "&number=" + course_num;
        }
        
        axios.get('http://api.lib.sfu.ca/reserves/search?' + sub_payload + num_payload)
        .then((resp) => {
          let arr = resp.data.reserves;

          const attachment = new Discord.MessageAttachment('./resources/icons/textbook.png', 'textbook.png');

          const richMsg = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`Textbook Matches`)
          .setDescription(`Sorry for the wait, ${message.author.tag}! 😅 \nHere are some textbooks that I've found. \n\nPlease note that availability is subject to change. Visit links to view available formats and quantities.`)
          .attachFiles(attachment)
          .setThumbnail('attachment://textbook.png')  

          for (el in arr) {
            richMsg.addField(`${arr[el].title.slice(0,250)}`, `Author: ${arr[el].author.slice(0,250)}\n Course: ${arr[el].course}\n Link: ${arr[el].item_url.slice(0,250)}\n ISNS: ${arr[el].isns}`);
            count++; 
            if (count > textbooks_limit) {
              break;
            }
          }

          message.reply(richMsg);

        });
        break;
      default:
        message.reply("Please enter a valid library command (About / Textbook)");
        break;      
    }

    return;
    
  }
}