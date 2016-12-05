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
            debug: true
        });

        this.slackController.setupWebserver(this.process.env.PORT || 3000, (err, webserver) => {
            this.slackController.createWebhookEndpoints(webserver);
        });

        this.slackController.hears(['(.*)'], 'mention,direct_message', this.witService.handleInteractive());
    }
}

const server = new Server(express, Botkit, process, witService);
server.$onInit();