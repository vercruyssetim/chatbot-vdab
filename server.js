const slackServer = require('./src/server/slack.server');
const facebookServer = require('./src/server/facebook.server');
const express = require('express');

class Server {
    constructor(slackServer, facebookServer, express, process) {
        this.slackServer = slackServer;
        this.facebookServer = facebookServer;
        this.express = express;
        this.process = process;
        this.facebookAccessToken = 'EAADewLyZAdYcBAAi0GZB0D1hAah7npwYcnehX0EeHm2ZBI2ZBn1VyVLoBhBwhodKVKmIIeUgAJfMizRRG9Hl18LTuwfCA3U6pNjgyVrz3yyVo1Aq5TiLXyIZBe2bVMVrmcnaE1yIawObFT3eZCcD76fwpoGZCI6RD74gmZBzCNqnRRhxgOdcZCwMZC';
        this.facebookVerifyToken = 'VDAB_CHAT_TOKEN';
    }

    $onInit() {
        this.slackServer.startServer(this.express, this.process.env.PORT || 3000, this.process.env.SLACK_VERIFY_TOKEN);
        this.facebookServer.startServer(this.express, this.facebookAccessToken, this.facebookVerifyToken, this.process.env.PORT || 3000);
    }
}

const server = new Server(slackServer, facebookServer, express, process);
server.$onInit();