const slackServer = require('./src/server/slack.server');
const facebookServer = require('./src/server/facebook.server');

class Server {
    constructor(slackServer, facebookServer) {
        this.slackServer = slackServer;
        this.facebookServer = facebookServer;
        this.facebookAccessToken = 'EAADewLyZAdYcBAAi0GZB0D1hAah7npwYcnehX0EeHm2ZBI2ZBn1VyVLoBhBwhodKVKmIIeUgAJfMizRRG9Hl18LTuwfCA3U6pNjgyVrz3yyVo1Aq5TiLXyIZBe2bVMVrmcnaE1yIawObFT3eZCcD76fwpoGZCI6RD74gmZBzCNqnRRhxgOdcZCwMZC';
        this.facebookVerifyToken = 'VDAB_CHAT_TOKEN';
        this.slackVerifyToken = 'iPzRWC0PTa7ZCgfHaimMcYCl';
        this.slackClientId = '19468825747.109798990870';
        this.slackClientSecret = 'ee07f0d62f0757a8a3e572a24615b64c';
    }

    $onInit() {
        this.slackServer.startServer(this.slackClientId, this.slackClientSecret, this.slackVerifyToken);
        this.facebookServer.startServer(this.facebookAccessToken, this.facebookVerifyToken);
    }
}

const server = new Server(slackServer, facebookServer);
server.$onInit();