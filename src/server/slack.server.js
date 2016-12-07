const Botkit = require('botkit');
const witService = require('../ai/wit.service');

class SlackServer {
    constructor(Botkit, witService) {
        this.Botkit = Botkit;
        this.witService = witService;
    }

    startServer(Botkit, port, slackVerifyToken) {
        let controller = Botkit.slackbot({
            debug:false
        });

        let bot = controller.spawn({
            token: 'xoxp-19468825747-19467089236-113138910897-49790901bb9253f87a21283975bb13ea'
        }).startRTM();

        controller.setupWebserver(port, (err, webserver) => {
            controller.createWebhookEndpoints(controller.webserver, bot, () => {
                console.log(`Bot online on port ${port}`);
            })
        });
        controller.hears(['(.*)'], 'message_received', (bot, message) => {
            this.witServer.handleInteractive(message.text, message.mid, (text) => {
                bot.reply(message, text);
            });
        });
    }
}
const slackServer = new SlackServer(Botkit, witService);
module.exports = slackServer;
