const mineflayerViewer = require('prismarine-viewer').mineflayer;

module.exports = {
	name: 'view',
	description: 'Lets you see what the bot sees.',
	execute(_args) {
		mineflayerViewer(bot, {viewDistance: 12, port: 3000});
	},
};