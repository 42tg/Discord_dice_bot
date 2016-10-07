;(function () {
  'use strict'
  var DiceFactory = require('./DiceFactory.js')
  var config = require('./../config.json')

  var Commands = []

  Commands.push({
    // Normal Roll
    fn: function (user, userId, channelId, message, event, bot) {
      var dices = DiceFactory.getDices(message)

      if (dices.length > 0) {
        var returnMessage = ['<@!' + userId + '> du hast einen Wurf gemacht:']
        dices.forEach(function (dice) {
          returnMessage.push(dice.toString())
        })
        bot.sendMessage({
          to: channelId,
          message: returnMessage.join('\n')
        })
      }
    }
  })

  if (config.useSplittermondRuleset) {
    Commands.push({
      fn: function (user, userId, channelId, message, event, bot) {
        var match = /#standard\s*(?:([\+\-])\s*(\d*))?(?:\s*:\s*(\d+))?/gi.exec(message)
        if (match) {
          var sign = match[1] || '+'
          var fixed = match[2] || 0
          var against = match[3] || false
          // create message
          var returnMessage = ['<@!' + userId + '> du hast einen Standard Wurf gemacht :']
          var dices = DiceFactory.getDices('#roll 2d10k2H' + (fixed ? ' ' + sign + ' ' + fixed : '') + (against ? ' : ' + against : ''), true)
          dices.forEach(function (dice) {
            returnMessage.push(dice.toString())
          })
          // send Message back
          bot.sendMessage({
            to: channelId,
            message: returnMessage.join('\n')
          })
        }
      }
    })

    Commands.push({
      fn: function (user, userId, channelId, message, event, bot) {
        var match = /#risiko\s*(?:([\+\-])\s*(\d*))?(?:\s*:\s*(\d+))?/gi.exec(message)
        if (match) {
          var sign = match[1] || '+'
          var fixed = match[2] || 0
          var against = match[3] || false
          // create message
          var returnMessage = ['<@!' + userId + '> du hast einen Risiko-Wurf gemacht :']
          var dices = DiceFactory.getDices('#roll 4d10k2H' + (fixed ? ' ' + sign + ' ' + fixed : '') + (against ? ' : ' + against : ''), true)
          dices.forEach(function (dice) {
            returnMessage.push(dice.toString())
          })
          // send Message back
          bot.sendMessage({
            to: channelId,
            message: returnMessage.join('\n')
          })
        }
      }
    })

    Commands.push({
      fn: function (user, userId, channelId, message, event, bot) {
        var match = /#sicherheit\s*(?:([\+\-])\s*(\d*))?(?:\s*:\s*(\d+))?/gi.exec(message)
        if (match) {
          var sign = match[1] || '+'
          var fixed = match[2] || 0
          var against = match[3] || false
          // create message
          var returnMessage = ['<@!' + userId + '> du hast einen Sicherheits-Wurf gemacht :']
          var dices = DiceFactory.getDices('#roll 2d10k1H' + (fixed ? ' ' + sign + ' ' + fixed : '') + (against ? ' : ' + against : ''), false)
          dices.forEach(function (dice) {
            returnMessage.push(dice.toString())
          })
          // send Message back
          bot.sendMessage({
            to: channelId,
            message: returnMessage.join('\n')
          })
        }
      }
    })
  }

  module.exports = Commands
}())
