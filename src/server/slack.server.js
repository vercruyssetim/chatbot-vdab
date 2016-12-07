const Slapp = require('slapp');
const express = require('express');
const ConvoStore = require('slapp-convo-beepboop');
const Context = require('slapp-context-beepboop');
const witService = require('../ai/wit.service');

class SlackServer {
    constructor(Slapp, ConvoStore, Context, witService, express) {
        this.Slapp = Slapp;
        this.ConvoStore = ConvoStore;
        this.Context = Context;
        this.witService = witService;
        this.slapp = null;
    }

    startServer(express, port, slackVerifyToken) {
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
            witServer.handleInteractive(message.text, message.mid, (text) => {
                bot.reply(message, text);
            });
        });
    }
}
const slackServer = new SlackServer(Slapp, ConvoStore, Context, witService, express);
module.exports = slackServer;
