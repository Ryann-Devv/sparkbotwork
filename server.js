const { default_prefix } = require("./config.json")

const { MessageEmbed } = require("discord.js");
require('./keep_alive.js')
const fetch = require("node-fetch");
const db = require("quick.db");
const moment = require("moment");
const { emotes, emoji } = require("./config.json")
const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: false
});

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["commands"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.queue = new Map()
process.on('unhandledRejection', console.error);

client.on("message", async message => {


  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(default_prefix)) return;

  if (!message.member)
    message.member = message.guild.fetchMember(message);

  const args = message.content
    .slice(default_prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

client.on("ready", () => {
  client.user.setStatus("online");
  console.log("------------------------------------------------------------------------")
  console.log("Bot node successful. Bot is now appearing as online.")
  
});

const portToUse = 80
console.log('Port to use is ' + portToUse)

require('http').createServer((req, res) => res.end('')).listen(portToUse)

client.on("ready", () => {
  client.user.setActivity(`sparkbot.cf | ?help`, { type: "PLAYING" })
  console.log("------------------------------------------------------------------------")
  console.log("Bot status set successfully")
  console.log("------------------------------------------------------------------------")
})
const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: false,
});

client.player = player;

new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
    timeout: 10,
    volume: 150,
    quality: 'high',
});
const fs = require('fs')


const { GiveawaysManager } = require("discord-giveaways");

const manager = new GiveawaysManager(client, {
  storage: "./handlers/giveaways.json",
  updateCountdownEvery: 10000,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});
client.giveawaysManager = manager;

client.on('guildMemberAdd', member => {
  try {
  let guild = member.guild;
  const roleToGive = db.get(`storage_autorole_${member.guild.id}`);
  const welcomeChannel = db.get(`storage_welcomechannel_${member.guild.id}`);
  const welcomeChannelToMsg = guild.channels.cache.get(welcomeChannel);
  const userCreationDateTimestamp = member.user.createdTimestamp / 1000
  const userCreationDateProper = Math.round(userCreationDateTimestamp)
  const welcomeEmbed = new MessageEmbed()
    .setDescription('<@' + member.id + '> ' + member.user.tag)
    .addField('User Creation Date', '<t:' + userCreationDateProper + ':D>')
    .setAuthor('Member Joined', member.user.avatarURL())
    .setFooter('ID: ' + member.id)
    .setTimestamp()
    .setThumbnail(member.user.avatarURL())
    .setColor('#77dd77')
  welcomeChannelToMsg.send(welcomeEmbed)
  member.roles.add(roleToGive)
  } catch {
    return
  }
});

client.on('guildMemberRemove', member => {
  try {
  let guild = member.guild;
  const welcomeChannel = db.get(`storage_welcomechannel_${member.guild.id}`);
  const welcomeChannelToMsg = guild.channels.cache.get(welcomeChannel);
  const userCreationDateTimestamp = member.user.createdTimestamp / 1000
  const userCreationDateProper = Math.round(userCreationDateTimestamp)
  const welcomeEmbed = new MessageEmbed()
    .setDescription('<@' + member.id + '> ' + member.user.tag)
    .addField('User Creation Date', '<t:' + userCreationDateProper + ':D>')
    .setAuthor('Member Left', member.user.avatarURL())
    .setFooter('ID: ' + member.id)
    .setTimestamp()
    .setThumbnail(member.user.avatarURL())
    .setColor('#ff6961')
  welcomeChannelToMsg.send(welcomeEmbed)
  } catch {
    return
  }
});

require("./ExtendedMessage");
allowedMentions: {
  repliedUser: true
}


client.login("ODg2ODY3MzkzMjc4ODAzOTY4.YT71nw.dmGasb_xJ4GBJC309dV6DgwjJRk");