const Botkit = require('botkit');
const witServer = require('../ai/wit.service');
const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');

class FacebookServer {

    constructor(Botkit, witServer) {
        this.Botkit = Botkit;
        this.witServer = witServer;
    }

    startServer(express, port, accessToken, verifyToken) {
        let controller = Botkit.facebookbot({
            access_token: accessToken,
            verify_token: verifyToken,
            hostname: 'localhost'
        });
        let bot = controller.spawn({});
        controller.setupWebserver = this.setupWebserver;
        controller.setupWebserver(express, port, (err, webserver) => {
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

    setupWebserver(expressServer, port, cb) {

        if (!port) {
            throw new Error('Cannot start webserver without a port');
        }

        let static_dir = __dirname + '/public';

        if (this.config && this.config.webserver && this.config.webserver.static_dir)
            static_dir = this.config.webserver.static_dir;

        this.config.port = port;

        this.webserver = expressServer;
        this.webserver.use(bodyParser.json());
        this.webserver.use(bodyParser.urlencoded({extended: true}));
        this.webserver.use(express.static(static_dir));

        let server = this.webserver.listen(
            this.config.port,
            this.config.hostname,
            () => {
                this.log('** Starting webserver on port ' +
                    this.config.port);
                if (cb) {
                    cb(null, this.webserver);
                }
            });


        request.post('https://graph.facebook.com/me/subscribed_apps?access_token=' + this.config.access_token,
            (err, res, body) => {
                if (err) {
                    this.log('Could not subscribe to page messages');
                } else {
                    this.debug('Successfully subscribed to Facebook events:', body);
                    this.startTicking();
                }
            });

        return this;

    };
}

const botkit = new FacebookServer(Botkit, witServer);
module.exports = botkit;
