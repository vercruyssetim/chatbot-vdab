const Botkit = require('botkit');
const webserver = require('./web.server');
const witService = require('../ai/wit.service');
const conversationService = require('../conversation/conversation.service');
const request = require('request');

class FacebookServer {

    constructor(Botkit, webserver, witService, conversationService) {
        this.Botkit = Botkit;
        this.webserver = webserver;
        this.witService = witService;
        this.conversationService = conversationService;
    }

    startServer(accessToken, verifyToken) {
        let controller = Botkit.facebookbot({
            verify_token: verifyToken,
            access_token: accessToken,
            json_file_store: './storage',
            port: '3000',
            hostname: 'localhost'
        });
        let bot = controller.spawn({});

        this.login(accessToken, () => {
            controller.startTicking();
        });
        controller.createWebhookEndpoints(this.webserver.server, bot);

        controller.hears(['(.*)'], 'message_received', (bot, message) => {
            console.log(`user id: ${message.user}`);
            this.conversationService.handleRequest({text: message.text, userId: message.user}, (text) => {
                bot.reply(message, text);
            });
        });
    }

    login(access_token, callBack) {
        request.post('https://graph.facebook.com/me/subscribed_apps?access_token=' + access_token,
            (err, res, body) => {
                if (err) {
                    console.log('Could not subscribe to page messages');
                } else {
                    console.log('Successfully subscribed to Facebook events:', body);
                    callBack();
                }
            });
        return this;
    };
}

const botkit = new FacebookServer(Botkit, webserver, witService, conversationService);
module.exports = botkit;
