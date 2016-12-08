const slackServer = require('./src/server/slack.server');
const facebookServer = require('./src/server/facebook.server');
const bodyParser = require('body-parser');
const express = require('express');

class Server {
    constructor(slackServer, facebookServer, express, process) {
        this.slackServer = slackServer;
        this.facebookServer = facebookServer;
        this.express = express;
        this.process = process;
        this.facebookAccessToken = 'EAADewLyZAdYcBAAi0GZB0D1hAah7npwYcnehX0EeHm2ZBI2ZBn1VyVLoBhBwhodKVKmIIeUgAJfMizRRG9Hl18LTuwfCA3U6pNjgyVrz3yyVo1Aq5TiLXyIZBe2bVMVrmcnaE1yIawObFT3eZCcD76fwpoGZCI6RD74gmZBzCNqnRRhxgOdcZCwMZC';
        this.facebookVerifyToken = 'VDAB_CHAT_TOKEN';
        this.slackVerifyToken = 'iPzRWC0PTa7ZCgfHaimMcYCl';
        this.slackClientId = '19468825747.109798990870';
        this.slackClientSecret = 'ee07f0d62f0757a8a3e572a24615b64c';
    }

    $onInit() {
        let webserver = this.startExpressServer('localhost', this.process.env.PORT || 3000);
        this.slackServer.startServer(webserver, this.slackClientId, this.slackClientSecret, this.slackVerifyToken);
        this.facebookServer.startServer(webserver, this.facebookAccessToken, this.facebookVerifyToken);
    }

    startExpressServer(hostname, port) {
        let webserver = this.express();
        webserver.use(bodyParser.json());
        webserver.use(bodyParser.urlencoded({extended: true}));
        webserver.use(express.static(__dirname + '/public'));
        let server = webserver.listen(
            port,
            hostname,
            () => console.log('** Starting webserver on port ' + port)
        );
        return webserver;
    }
}

const server = new Server(slackServer, facebookServer, express, process);
server.$onInit();