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

    startServer(webserver, accessToken, verifyToken) {
        let controller = Botkit.facebookbot({
            verify_token: verifyToken,
            access_token: accessToken,
            json_file_store: './storage',
            port: '3000',
            hostname: 'localhost'
        });
        let bot = controller.spawn({});

        this.login.bind(controller)(accessToken);
        controller.createWebhookEndpoints(webserver, bot);

        controller.hears(['(.*)'], 'message_received', (bot, message) => {
            witServer.handleInteractive(message.text, message.mid, (text) => {
                bot.reply(message, text);
            });
        });
    }

    login(access_token) {
        request.post('https://graph.facebook.com/me/subscribed_apps?access_token=' + access_token,
            (err, res, body) => {
                if (err) {
                    console.log('Could not subscribe to page messages');
                } else {
                    console.log('Successfully subscribed to Facebook events:', body);
                    this.startTicking();
                }
            });
        return this;
    };
}

const botkit = new FacebookServer(Botkit, witServer);
module.exports = botkit;
