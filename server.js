const express = require('express');
const Botkit = require('botkit');
const BeepBoopBotkit = require('beepboop-botkit');
const witService = require('./src/wit/witService');

class Server {
    constructor(express, Botkit, BeepBoopBotkit, process, witService) {
        this.express = express;
        this.Botkit = Botkit;
        this.BeepBoopBotkit = BeepBoopBotkit;
        this.process = process;
        this.witService = witService;
        this.slackController = null;
        console.log(JSON.stringify(process.env));
    }

    $onInit() {
        this.initSlap();
    }

    initSlap() {
        this.slackController = this.Botkit.slackbot({
            retry: Infinity,
            debug: true
        });

        this.BeepBoopBotkit.start(this.slackController, {debug: true});
        this.slackController.hears(['(.*)'], 'mention,direct_message', this.witService.handleInteractive());
    }
}

const server = new Server(express, Botkit, BeepBoopBotkit, process, witService);
server.$onInit();