const express = require('express');
const Botkit = require('botkit');
const witService = require('./src/wit/witService');

class Server {
    constructor(express, Botkit, process, witService) {
        this.express = express;
        this.Botkit = Botkit;
        this.process = process;
        this.witService = witService;
        this.slackController = null;
    }

    $onInit() {
        this.initSlap();
    }

    initSlap() {
        this.slackController = this.Botkit.slackbot({
            debug: false
        }).configureSlackApp({
            clientId: '19468825747.109798990870',
            clientSecret: 'ee07f0d62f0757a8a3e572a24615b64c',
            rtm_receive_messages: false,
            scopes: ['bot']
        });
        this.slackController.setupWebserver(this.process.env.PORT || 3000, () => {
            this.slackController.createWebhookEndpoints(this.slackController.webserver);
            this.slackController.createOauthEndpoints(this.slackController.webserver);
        });
        this.slackController.hears(['(.*)'], 'mention,direct_message', this.witService.handleInteractive());
    }
}

const server = new Server(express, Botkit, process, witService);
server.$onInit();