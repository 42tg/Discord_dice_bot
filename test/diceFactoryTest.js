;(function () {
  'use strict'

  if (!document) {
    var document
  }

  const str = `
  #roll
  #roll 2
  #roll d10
  #roll 2d10
  #roll 2d10 + 12
  #roll 4xd10 + 20
  #roll 4d10k2
  #roll 4d10k2 + 20
  #roll 4xd10k2 + 20
  #roll 4xd10k2 * 20
  #roll 4xd10k2 / 20
  #roll 2 / 20
  #roll 4d10k2 + 12 : 25
  #roll : 25
  #roll d10 : 12
  #roll 2d10 : 22
  #roll 4xd10 : 28 
  #roll 4d10k2 : 22
  #roll 4d10k2l : 22
  #roll 4d10k2 + 20 : 22
  `
  var diceFactory = require('./../js/DiceFactory.js')

  var dices = diceFactory.getDices(str, true)
  dices.forEach(function (test) {
    console.log(test.toString())
  })
})()
