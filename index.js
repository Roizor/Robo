const mineflayer = require('mineflayer');
const inquirer = require('inquirer');

inquirer.registerPrompt('file-tree-selection', require('inquirer-file-tree-selection-prompt'));

inquirer.prompt([
	{
		type: 'list',
		name: 'type',
		message: 'Choose a way to login...',
		choices: ['Login through CLI.', 'Import from JSON file.'],
		filter: (value) => {
			return value.toLowerCase().split(' ')[0];
		}
	},
]).then((answers) => {
	switch (answers.type) {
		case 'login':
			inquirer.prompt([
				{
					name: 'username',
					message: 'Username / Email:'
				}, 
				{
					name: 'password',
					message: 'Password:',
					type: 'password',
					mask: '•'
				}, 
				{
					name: 'host',
					message: 'Host:',
					required: true
				}, 
				{
					name: 'port',
					message: 'Port:',
					default: '25565'
				}, 
				{
					name: 'version',
					message: 'Version:',
					default: '1.16.1'
				}
			]).then((answers) => {
				makeBot(answers.username, answers.password, answers.host, answers.port, answers.version);
			});

			break;
		case 'import':
			inquirer.prompt([
				{
					type: 'file-tree-selection',
					name: 'file'
				}
			]).then((answers) => {
				const loginJSON = require(answers.file);

				makeBot(loginJSON.username, loginJSON.password, loginJSON.host, loginJSON.port, loginJSON.version);
			});

			break;
	}
});

const makeBot = (username, password, host, port, version) => {
	global.bot = mineflayer.createBot({
		host: host,
		port: port,
		username: username,
		password: password,
		version: version
	});

	bot.once('spawn', () => {
		require('./commands.js');
	});

	bot.on('message', (message) => {
		if (message.toString().startsWith('Time:')) return;

		console.log(message.toString());
	});

	bot.on('error', (error) => {
		console.log(error);
	});
}