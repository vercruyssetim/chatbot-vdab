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
        this.slapp = this.Slapp({
            verify_token: slackVerifyToken,
            convo_store: this.ConvoStore(),
            context: this.Context()
        });
        this.slapp.message('.*', ['mention', 'direct_message'], (bot, msg) => {
            this.witService.handleInteractive(msg, bot.conversation_id, (text) => bot.say(text))
        });

        let server = this.slapp.attachToExpress(express);
        server.listen(port, (err) => {
            if (err) {
                return console.error(err)
            }

            console.log(`Listening on port ${port}`)
        });
    }
}
const slackServer = new SlackServer(Slapp, ConvoStore, Context, witService, express);
module.exports = slackServer;
