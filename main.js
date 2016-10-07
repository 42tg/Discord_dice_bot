var _ = require('underscore')

var Discord = require('discord.io')
var config = require('./config.json')

var Commands = require('./js/commands.js')

if(!config.token){
  console.log('Please configure the config.json to use this Bot!')
  return
}
var bot = new Discord.Client({
  token: config.token,
  autorun: true
})

bot.on('ready', function () {
  console.log(bot.username + ' - (' + bot.id + ')')
})

bot.on('message', function (user, userId, channelId, message, event) {
  if (userId === bot.id || !event) {
    return
  }
  _.each(Commands, function (command) {
    try {
      command.fn(user, userId, channelId, message, event, bot)
    } catch (e) {
      bot.sendMessage({to: userId, message: 'Sorry, im crashed. Please contact my Designer for further Improvement'})
    }
  })
})
