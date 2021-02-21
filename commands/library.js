const creds = require('../creds.js');
const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
  name: 'library',
  description: 'Does library stuff',
  
  execute(message, args) {
  
    if (args.length == 0) {
      message.reply("Please enter a valid library command (About, Course, Workshops)");
      return;
    }

    const command = args[0].toLowerCase();
    const currDate = new Date();
    let payload;

    console.log(currDate.toLocaleDateString());

    switch (command) {
      case "about":        
        // make API call
        axios.get('http://api.lib.sfu.ca/hours/3/summary?date=2021-01-15')
        .then((resp) => {
          console.log(resp.data);

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


          const link = "Click Me";
          const result = link.link("google.com");

          // const attachment = new Discord.MessageAttachment('./resources/icons/partly_sunny.png', 'partly_sunny.png');

          const richMsg = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`Library Hours`)
          .setURL('https://discord.js.org/')
          .setAuthor(`Here are the current library operation hours, ${message.author.tag}`)
          .setDescription(`Please note that current hours are being affected by COVID-19 lockdown protocol.`)
          // .attachFiles(attachment)
          // .setThumbnail('attachment://partly_sunny.png')  
          .addFields(
            {name: `${library_name_1}`, value: `Current Status: ${status_1}\n Hours : ${library_hours_1}\n Book Room: ${book_room_1}`},
            {name: `${library_name_2}`, value: `Current Status: ${status_2}\n Hours : ${library_hours_2}\n Book Room: ${book_room_2}`},
            {name: `${library_name_3}`, value: `Current Status: ${status_3}\n Hours : ${library_hours_3}\n Book Room: ${book_room_3}`},
            {name: `${library_name_4}`, value: `Current Status: ${status_4}\n Hours : ${library_hours_4}\n Book Room: ${book_room_4}`}
          )
          .setTimestamp()  
          
          message.reply(richMsg);
            
        })
        break;
      case "course":
        break;
      case "workshops":
        break;
      default:
        break;      
    }



    
  }
}