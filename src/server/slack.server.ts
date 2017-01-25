import * as Botkit from "botkit";
import {WitService} from "../ai/wit.service";
import {ExpressServer} from "./web.server";

export class SlackServer {

    private witService: WitService;
    private webserver: ExpressServer;
    private apiEndpoint;

    public constructor(webserver: ExpressServer, witService: WitService, apiEndpoint) {
        this.webserver = webserver;
        this.witService = witService;
        this.apiEndpoint = apiEndpoint;
    }

    startServer(clientId: string, clientSecret: string) {
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
        controller.createWebhookEndpoints(this.webserver.getServer());
        controller.createOauthEndpoints(this.webserver.getServer(), (err) => console.log(err));

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
