[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)     [<img src="https://discordapp.com/assets/e4923594e694a21542a489471ecffa50.svg" alt="alt text" width="100">](https://discord.gg/bbhBfZf)
# Discord Dice Rolling - Bot

## Generelle Informationen
Dieser Bot ist in Development!
Für Anregungen und Bugreports bitte die [Issue Section](https://github.com/42tg/discord_dice_bot/issues) benutzen

## Installation

```sh
git clone https://github.com/42tg/discord_dice_bot.git
cd discord_dice_bot
npm install

```
bearbeite deine config.json wie folgt :

```json
{
    "token": "[Enter your bot token here]"
}

```

Um die [Splittermond](http://www.splittermond.de) ergänzung zu nutzen:
```json
{
	"token" : "[Enter your bot token here]",
	"useSplittermondRuleset": true
}
```
Anschließend den Node Server starten:
```sh
node main.js
```
## Benutzung
Ich benutze die Standard [Dice Notation](https://en.wikipedia.org/wiki/Dice_notation) für normale Würfe
`#roll 2d6k2H + 6`
Mit [Splittermond](http://www.splittermond.de) Regelwerk habt ihr die Möglichkeit
`#standard`, `#risiko`, `#sicherheit` als vordefinierte shortcuts zu werfen welche auch Thriumph und Patzer mit anzeigen
Würfe gegen eine Schwierigkeit erfolgen immer am ende mit ` : X`
Bsp: `#roll 4d10k2 + 9 : 25`, `#risiko + 9 : 25` welches sogar die Erfolgsgrade angibt, falls [Splittermond](http://www.splittermond.de) Regelwerk aktiviert ist.


## Tipps
Zur Einrichtung auf einem Linux Server empfehle ich folgende Artikel
[Run node.js service with systemd](https://www.axllent.org/docs/view/nodejs-service-with-systemd/)
[How to deploy your node app on Linux, 2016 edition](https://certsimple.com/blog/deploy-node-on-linux#node-linux-service-systemd)

Schöne erklärung wie man einen Discord Bot anlegt und node kram installiert findet sich hier [WildBeast DiscordBot](https://github.com/TheSharks/WildBeast/wiki)

Bei fragen könnt ihr mich auch auf Discord erreichen : [<img src="https://discordapp.com/assets/e4923594e694a21542a489471ecffa50.svg" alt="alt text" width="100">](https://discord.gg/bbhBfZf)
