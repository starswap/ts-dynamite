# TypeScript Dynamite

## Background

You are probably familiar with the game Rock-Paper-Scissors. This variant adds two new elements - Dynamite and Water Balloon. The full rules can be found at https://dynamite.softwire.com.

## Your Task

Your job is to build an agent and pit it against your fellow interns (as well as a few other simple bots that I'll add into the mix)!

It's possible to get something working very quickly - there are already a few very simple bots in this repo - but the possibilities for making your agent more sophisticated and complex are endless!

## Getting Started

1. Read the rules at https://dynamite.softwire.com.
2. Fork this repo and open it in VS Code
3. Install the dependencies with `npm install`
4. Check that everything is working ok.

Powershell:

```shell
.\battle.ps1 rockBot paperBot
```

Bash:

```shell
sh battle.sh rockBot paperBot
```

You should see the following output with no error messages:

```
Game 1 results:
Winner: p2
Score: 0 - 1000
Reason: score
```

5. Write your own bot! You can add a new bot in the `src/bots/` directory.

## Testing Your Bot Locally

You can run your bot(s) against any other bot you have locally using the following command:

Powershell:

```shell
.\battle.ps1 playerOneBot playerTwoBot
```

Bash:

```shell
sh battle.sh playerOneBot playerTwoBot
```

## Testing Your Bot Remotely

You can upload your bot to https://dynamite.softwire.com to play against bots that other people have previosuly created.

**Important: you will need to upload the transpiled JavaScript file for your bot, not the TypeScript file that you developed. This can be found at `dist/bots/botName.js` after running `npm run convert`.**

## Tournament Ready

Towards the end of this exercise, I will create a tournament for everyone's bots. You will be able to enter you bot into the tournament on the Dynamite website.

A few notes to make this as fun as possible:
- Make sure you count your dynamite! There is nothing worse than losing a game at the last minute by attempting to use too much.
- The same instance of your class is used for all rounds of a match, so you can store any state you wish to keep track of independently of the Gamestate.
- Stay in the spirit of the game - e.g. don't try and use reflection to interfere with the game runner or opposing bots.
