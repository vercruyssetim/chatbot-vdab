const express = require('express');
const Slapp = require('slapp');
const ConvoStore = require('slapp-convo-beepboop');
const Context = require('slapp-context-beepboop');
const {Wit, log} = require('node-wit');
const messageService = require('./src/message/messageService');
const sessionService = require('./src/session/sessionService');

class Server {
    constructor(express, Slapp, ConvoStore, Context, Wit, log, process, messageService, sessionService) {
        this.express = express;
        this.Slapp = Slapp;
        this.ConvoStore = ConvoStore;
        this.Context = Context;
        this.Wit = Wit;
        this.log = log;
        this.process = process;
        this.sessionService = sessionService;
        this.messageService = messageService;
    }

    $onInit() {
        this.port = this.process.env.PORT || 3000;
        this.witClient = this.initWitClient();
        this.slapp = this.initSlap(this.witClient);
        this.initServer(this.slapp);
    }

    initWitClient() {
        return new Wit({
            accessToken: '4KLPNU647TKNYKGL6BYHQZK2MIZSFSQI',
            actions: {
                send: this.send.bind(this),
                getForecast: this.getForecast.bind(this)
            }
        });
    }

    initSlap(witClient) {
        let slapp = this.Slapp({
            // Beep Boop sets the SLACK_VERIFY_TOKEN env var
            verify_token: this.process.env.SLACK_VERIFY_TOKEN,
            convo_store: this.ConvoStore(),
            context: this.Context()
        });
        slapp.message('.*', ['mention', 'direct_message'], this.interactiveWit(this.witClient, this.sessionService, this.messageService));
        return slapp;
    }

    initServer(slapp) {
        let server = slapp.attachToExpress(express());

        server.listen(this.port, (err) => {
            if (err) {
                return console.error(err)
            }

            console.log(`Listening on port ${this.port}`)
        });
    }

    interactiveWit(witClient, sessionService, messageService){
        return (msg, text) => {
            let sessionId = 'session3';
            let context = sessionService.getContext(sessionId);
            messageService.addSender(sessionId, msg);
            witClient.runActions(sessionId, text, context)
                .then((context) => {
                    sessionService.setContext(context);
                    messageService.removeSender(sessionId);
                })
                .catch(console.error);
        }
    }

    send(request, response) {
        const {sessionId, context, entities} = request;
        const {text, quickreplies} = response;
        console.log('receiving...', JSON.stringify(request));
        console.log('sending...', JSON.stringify(response));
        this.messageService.sendMessage(sessionId, response.text);
        return Promise.resolve();
    }

    getForecast({context, entities}) {
        let location = Server.firstEntityValue(entities, 'location');
        if (location) {
            context.forecast = 'sunny in ' + location; // we should call a weather API here
            delete context.missingLocation;
        } else {
            context.missingLocation = true;
            delete context.forecast;
        }
        console.log('context: ', JSON.stringify(context));
        console.log('entities: ', JSON.stringify(entities));
        return Promise.resolve(context);
    }

    static firstEntityValue(entities, entity) {
        const val = entities && entities[entity] &&
            Array.isArray(entities[entity]) &&
            entities[entity].length > 0 &&
            entities[entity][0].value;
        if (!val) {
            return null;
        }
        return typeof val === 'object' ? val.value : val;
    }
}

const server = new Server(express, Slapp, ConvoStore, Context, Wit, log, process, messageService, sessionService);
server.$onInit();