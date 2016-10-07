;(function () {
  'use strict'
  var DiceFactory = function () {
    var Random = require('random-js')
    var _ = require('lodash')

    function Dice (match, useSplittermondRules) {
      if (!match) {
        match = []
      }
      // basestats
      this.original = match[0].trim() || ''
      this.dices = match[1] || 2
      this.sides = match[2] || 10
      this.keep = match[3] || this.dices
      this.highLow = match[4] || 'h'
      this.operator = match[5] || '+'
      this.fixed = parseInt(match[6]) || false
      this.against = match[7] || false

      // Splittermond regelwerk
      this.slip = false // patzer
      this.triumph = false // triumph

      // results
      this.rolled = []
      this.keeped = []
      this.value = false
      this.eg = false

      roll(this)
      handleRoll(this)
      calculateValue(this)
      calculateEg(this)

      function roll (dice) {
        var engine = Random.engines.mt19937()
        engine.autoSeed()
        var dices = Random.dice(dice.sides, dice.dices)(engine)
        dice.rolled = dices
      }

      function handleRoll (dice) {
        var sorted = _.sortBy(dice.rolled)

        if (useSplittermondRules && _.sum(_.slice(sorted, sorted.length - 2)) >= 19) {
          dice.triumph = true
        }
        if (useSplittermondRules && _.sum(_.slice(sorted, 0, 2)) <= 3) {
          dice.slip = true
          dice.triumph = false
        }

        if (dice.highLow.toUpperCase() === 'L') {
          sorted = _.slice(sorted, 0, dice.keep)
        } else {
          sorted = _.slice(sorted, sorted.length - dice.keep)
        }

        dice.keeped = sorted
      }

      function calculateValue (dice) {
        var diceValue = _.sum(dice.keeped)
        switch (dice.operator) {
          case '+':
            diceValue += dice.fixed
            break
          case '-':
            diceValue -= dice.fixed
            break
          case '*':
            diceValue *= dice.fixed
            break
          case '/':
            diceValue /= dice.fixed
            break
        }
        dice.value = diceValue
      }

      function calculateEg (dice) {
        if (!dice.against) {
          return false
        }
        var eg = ((dice.value - dice.against) / 3)
        if (eg < 0) {
          eg = Math.ceil(eg)
        } else {
          eg = Math.floor(eg)
        }
        if (dice.slip) {
          eg -= 3
        } else if (dice.triumph) {
          eg += 3
        }
        dice.eg = eg
      }
    }

    Dice.prototype.toString = function dicetoString () {
      var message = []
      message.push('`' + this.original + ' ->  ' + this.dices + 'd' + this.sides + 'k' + this.keep + this.highLow.toUpperCase() + (this.fixed ? ' ' + this.operator + ' ' + this.fixed : '') + (this.against ? ' : ' + this.against : '') + '`')
      if (this.slip) {
        message.push(':poop: :poop: :poop: :poop: **PATZER** :poop: :poop: :poop: :poop:')
      } else if (this.triumph) {
        message.push(':trophy: :trophy: :trophy: :trophy: **TRIUMPH** :trophy: :trophy: :trophy: :trophy:')
      }
      message.push('*[' + this.rolled.join(' + ') + '] -> [' + this.keeped.join(' + ') + ']' + (this.fixed ? ' ' + this.operator + ' ' + this.fixed : '') + '* = **' + this.value + '**')
      if (this.against) {
        message.push('*Gegen* **' + this.against + '** *hast du* **' + this.eg + '** *Erfolgsgrade erziehlt!*')
      }
      message.push('')

      return message.join('\n')
    }

    var regex = /#roll\s*(\d+)?[\sx\*]*(?:d(\d+))?(?:k(\d+)([H|L])?)?(?:\s*([\+\-\*\/])\s*(\d*))?(?:\s*:\s*(\d+))?/gi

    return {
      exec: exec,
      getDices: getDices
    }

    function getDices (str, splittermond) {
      if (!splittermond) {
        splittermond = false
      }
      var dices = []
      var m
      while ((m = exec(str)) !== null) {
        // The result can be accessed through the `m`-variable.
        dices.push(new Dice(m, splittermond))
      }
      return dices
    }
    function exec (str) {
      return regex.exec(str)
    }
  }

  module.exports = new DiceFactory()
}())
