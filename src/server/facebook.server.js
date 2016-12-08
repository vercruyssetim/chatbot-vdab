const Botkit = require('botkit');
const webserver = require('./web.server');
const witService = require('../ai/wit.service');
const apiService = require('../ai/api.service');
const request = require('request');

class FacebookServer {

    constructor(Botkit, webserver, witService, apiService) {
        this.Botkit = Botkit;
        this.webserver = webserver;
        this.witService = witService;
        this.apiService = apiService;
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
            this.apiService.sendRequest(message.text, message.mid, (text) => {
                bot.reply(message, `From api.ai: ${text}`);
            });
            this.witService.handleInteractive(message.text, message.mid, (text) => {
                bot.reply(message, `From wit.ai: ${text}`);
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

const botkit = new FacebookServer(Botkit, webserver, witService, apiService);
module.exports = botkit;
