const discord = require("discord.js");

module.exports = {
  name: "downtime",
  category: "info",
  description: "Shows scheduled downtime",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setDescription(`**We are doing some infurstructure changes (Expected downtime 3-5 hours)**`)
    .setColor("RANDOM")
    .setFooter(`Requested by ${message.author.username}`)
    
    message.channel.send(embed)
  }
}