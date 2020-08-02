const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Lists all Robo commands.',
	execute(_args) {
		console.log(Array.from(commands).map(([_, command]) => `${prefix}${command.name} - ${command.description}`).join('\n'));
	},
};