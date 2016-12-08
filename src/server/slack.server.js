const Botkit = require('botkit');
const witService = require('../ai/wit.service');
const bodyParser = require('body-parser');
const express = require('express');

class SlackServer {
    constructor(Botkit, witService) {
        this.Botkit = Botkit;
        this.witService = witService;
    }

    startServer(webserver, clientId, clientSecret, verifyTokens) {
        let controller = Botkit.slackbot({
            clientId,
            clientSecret,
            json_file_store: './storage',
            port: '3000',
            hostname: 'localhost',
            scopes: ['bot'],
            debug: false
        });

        //passing verifyTokens will block the facebook bot
        controller.createWebhookEndpoints(webserver);
        controller.createOauthEndpoints(webserver, (err) => console.log(err));

        controller.hears(['(.*)'], 'mention,direct_message', (bot, message) => {
            this.witService.handleInteractive(message.text, message.ts, (text) => {
                bot.reply(message, text);
            });
        });
    }
}
const slackServer = new SlackServer(Botkit, witService);
module.exports = slackServer;
