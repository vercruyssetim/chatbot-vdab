const express = require('express');
const Slapp = require('slapp');
const ConvoStore = require('slapp-convo-beepboop');
const Context = require('slapp-context-beepboop');
const witService = require('./src/wit/witService');

class Server {
    constructor(express, Slapp, ConvoStore, Context, process, witService) {
        this.express = express;
        this.Slapp = Slapp;
        this.ConvoStore = ConvoStore;
        this.Context = Context;
        this.process = process;
        this.witService = witService;
    }

    $onInit() {
        this.slapp = this.initSlap();
        this.initServer(this.slapp, this.process.env.PORT || 3000);
    }

    initSlap() {
        let slapp = this.Slapp({
            // Beep Boop sets the SLACK_VERIFY_TOKEN env var
            verify_token: this.process.env.SLACK_VERIFY_TOKEN,
            convo_store: this.ConvoStore(),
            context: this.Context()
        });
        slapp.message('.*', ['mention', 'direct_message'], this.witService.handleInteractive());
        return slapp;
    }

    initServer(slapp, port) {
        let server = slapp.attachToExpress(express());

        server.listen(port, (err) => {
            if (err) {
                return console.error(err)
            }

            console.log(`Listening on port ${port}`)
        });
    }
}

const server = new Server(express, Slapp, ConvoStore, Context, process, witService);
server.$onInit();