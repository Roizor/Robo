const fs = require('fs');
const inquirer = require('inquirer');
const serverline = require("serverline");
const { prefix } = require('./config.json');

const commandFiles = fs.readdirSync('./commands');

global.commands = new Map();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	commands.set(command.name, command);
}

serverline.init();

console.log(Array(process.stdout.rows + 1).join('\n'));

serverline.on('line', (line) => {
	executeCommand(line);
});

const executeCommand = (message) => {
	if (!message.startsWith(prefix)) return;

	const args = message.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	
	if (commands.has(command)) {
		const usage = commands.get(command).usage;

		var requiredArgs = 0;

		if (usage != undefined) {
			requiredArgs = usage.split(' ').length;
		}

		if (args.length >= requiredArgs) {
			commands.get(command).execute(args);
		} else {
			console.log(`Usage: ${prefix}${command} ${usage}`);
		}
	}
}