module.exports = {
	name: 'say',
	description: 'Says something ingame.',
	usage: '<message>',
	execute(args) {
		bot.chat(args.join(' '));
	},
};