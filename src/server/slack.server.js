import Botkit from 'botkit';
import webserver from './web.server';
import witService from '../ai/wit.service';
import apiEndpoint from '../ai/api.endpoint';

class SlackServer {
    constructor(Botkit, webserver, witService, apiEndpoint) {
        this.Botkit = Botkit;
        this.webserver = webserver;
        this.witService = witService;
        this.conversationService = apiEndpoint;
    }

    startServer(clientId, clientSecret) {
        let controller = this.Botkit.slackbot({
            clientId,
            clientSecret,
            json_file_store: './storage',
            port: '3000',
            hostname: 'localhost',
            scopes: ['bot'],
            debug: false
        });

        //passing verifyTokens will block the facebook bot
        controller.createWebhookEndpoints(this.webserver.server);
        controller.createOauthEndpoints(this.webserver.server, (err) => console.log(err));

        controller.hears(['(.*)'], 'mention,direct_message', (bot, message) => {
            this.apiEndpoint.sendQuery(message.text, message.ts, (text) => {
                bot.reply(message, `From api.ai: ${text}`);
            });
            this.witService.handleInteractive(message.text, message.ts, (text) => {
                bot.reply(message, `From wit.ai: ${text}`);
            });
        });
    }
}
const slackServer = new SlackServer(Botkit, webserver, witService, apiEndpoint);
export default slackServer;
