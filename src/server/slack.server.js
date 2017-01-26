import Botkit from 'botkit';

export default class SlackServer {
    constructor(webserver, witService, apiEndpoint) {
        this.webserver = webserver;
        this.witService = witService;
        this.conversationService = apiEndpoint;
    }

    startServer(clientId, clientSecret) {
        let controller = Botkit.slackbot({
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
